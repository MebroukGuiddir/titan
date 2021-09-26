<?php

namespace App\Controller;

use Doctrine\ORM\EntityManagerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\Form\Extension\Core\Type\TextType;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\Validator\Validator\ValidatorInterface;
use App\Entity\User;


class NewsletterController extends AbstractController
{
    /**
     * @Route("/newsletter/inscription", name="newsletter")
     */
    public function index(EntityManagerInterface $entityManager,ValidatorInterface $validator, Request $request): Response
    {
        if ($request->query->get('email') !== null &&
            $request->query->get('firstName') !== null &&
            $request->query->get('lastName') !== null ) {


            $firstName=$request->query->get('firstName');
            $lastName=$request->query->get('lastName');
            $email=$request->query->get('email');


            // register
            $user = new User();
            $user->setEmail($email)
                ->setFirstName($firstName)
                ->setLastName($lastName)
                ->setRoles($user->getRoles());


            // user validation
            $errors = $validator->validate($user);
            if (count($errors) > 0) {
                $errorsString = (string) $errors;

                return $this->render('newsletter/index.html.twig', [
                    'submitted' => True,
                    'status' => False,
                    'message' =>  $errorsString,
                ]);
            }
            // Check if th email is already used
            if($entityManager->getRepository('App\Entity\User')->findBy(array('email' => $request->query->get('email')))){
                return $this->render('newsletter/index.html.twig', [
                    'submitted' => True,
                    'status' => False,
                    'message' => 'You have already registered for the newsletter',
                ]);
            }

            // persist
            try {
                $entityManager->persist($user);
                $entityManager->flush();
                return $this->render('newsletter/index.html.twig', [
                    'submitted' => True,
                    'status' => True,
                    'message' => 'Registered !',
                ]);
            }
            catch (\Exception $exception){
                return $this->render('newsletter/index.html.twig', [
                    'submitted' => True,
                    'status' => False,
                    'message' => 'Something went wrong please try again',
                ]);
            }
        }

        return $this->render('newsletter/index.html.twig', [
        'submitted' => False
    ]);
    }
}
