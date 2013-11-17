<?php

namespace DEPI\AlumnosProyectosBundle\Entity;

use Doctrine\ORM\EntityRepository;

class AlumnosProyectosRepository extends EntityRepository
{
	public function findAlumnosConProyecto()
	{
		$em = $this->getEntityManager();

		$dql = $em->createQueryBuilder();
 
		$dql->select('ap', 'alumno', 'proyecto')
		    ->from('AlumnosProyectosBundle:AlumnosProyectos', 'ap')
		    ->Join('ap.idAlumno', 'alumno')
		    ->Join('ap.idProyecto', 'proyecto');

		return $dql->getQuery()->getResult();
	}

	public function findDatosAlumnoProyecto($id)
	{
		$em = $this->getEntityManager();

		$dql = $em->createQueryBuilder();
 
		$dql->select('ap', 'alumno', 'proyecto')
		    ->from('AlumnosProyectosBundle:AlumnosProyectos', 'ap')
		    ->Join('ap.idAlumno', 'alumno')
		    ->Join('ap.idProyecto', 'proyecto')
		    ->where('ap.id = :id_alumnoproyecto' );
		$consulta = $dql->getQuery();
		$consulta -> setParameter('id_alumnoproyecto', $id);

		return  $consulta->getSingleResult();
	}
}