<?php

namespace DEPI\LineasInvestigacionBundle\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Method;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Route;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Template;
use DEPI\LineasInvestigacionBundle\Entity\LineasInvestigacion;
use DEPI\LineasInvestigacionBundle\Form\LineasInvestigacionType;

/**
 * LineasInvestigacion controller.
 *
 * @Route("/lineas")
 */
class LineasInvestigacionController extends Controller
{

    /**
     * Lists all LineasInvestigacion entities.
     *
     * @Route("/", name="lineas")
     * @Method("GET")
     * @Template()
     */
    public function indexAction()
    {
        $em = $this->getDoctrine()->getManager();

        $entities = $em->getRepository('LineasInvestigacionBundle:LineasInvestigacion')->findAll();

        $paginator = $this->get('knp_paginator');
        $pagination = $paginator->paginate($entities, $this->get('request')->query->get('page',1), 5);

        return array('entities' => $pagination);
    }
    /**
     * Creates a new LineasInvestigacion entity.
     *
     * @Route("/", name="lineas_new")
     * @Method("POST")
     * @Template()
     */
    public function newAction()
    {
        $entity = new LineasInvestigacion();
        $form = $this->createForm(new LineasInvestigacionType(), $entity);

        $form->handleRequest($this->getRequest());

        if ($form->isValid()) {
            $em = $this->getDoctrine()->getManager();
            $em->persist($entity);
            $em->flush();

            return $this->redirect($this->generateUrl('lineas'));
        }

        return array('entity' => $entity, 'form' => $form->createView());
    }
    /**
     * Edits an existing LineasInvestigacion entity.
     *
     * @Route("/{id}", name="lineas_edit")
     * @Method("PUT")
     * @Template()
     */
    public function editAction($id)
    {
        $em = $this->getDoctrine()->getManager();

        $entity = $em->getRepository('LineasInvestigacionBundle:LineasInvestigacion')->find($id);

        if (!$entity) {
            throw $this->createNotFoundException('Unable to find LineasInvestigacion entity.');
        }

        $form = $this->createForm(new LineasInvestigacionType(), $entity, array(
            'action' => $this->generateUrl('lineas_edit', array('id' => $entity->getId())),
            'method' => 'PUT',
        ));

        $form->handleRequest($this->getRequest());

        if ($form->isValid()) {
            $em->flush();

            return $this->redirect($this->generateUrl('lineas'));
        }

        return array(
            'entity' => $entity,
            'form'   => $form->createView(),
        );
    }

    public function deleteAction($id)
    {
        $em = $this->getDoctrine()->getManager();

        $entity = $em->getRepository('LineasInvestigacionBundle:LineasInvestigacion')->deleteLineasInvestigacion($id);

        if (!$entity) {
            throw $this->createNotFoundException('Unable to find LineasInvestigacion entity.');
        }

        return $this->redirect($this->generateUrl('lineas'));
    }
}
