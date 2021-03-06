<?php

namespace DEPI\InvestigadoresBundle\Entity;

use Doctrine\ORM\EntityRepository;

class InvestigadoresRepository extends EntityRepository
{
	public function findInvestigadores()
	{
		$em = $this->getEntityManager();
		$dql = $em->createQueryBuilder();
		$dql->select('a')
		    ->from('InvestigadoresBundle:Investigadores', 'a');

		return $dql->getQuery()->getResult();
	}

	public function deleteInvestigadores($id)
	{
		$em = $this->getEntityManager();
		$dql = $em->createQueryBuilder();
		$dql->delete('InvestigadoresBundle:Investigadores', 'i')
		    ->where('i.id = :id_investigadores' );
 		$dql->setParameter('id_investigadores', $id);

		return $dql->getQuery()->getResult();
	}
}