<?php

namespace App\Repository;

use App\Entity\QuestionPosition;
use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
use Doctrine\Persistence\ManagerRegistry;

/**
 * @method QuestionPosition|null find($id, $lockMode = null, $lockVersion = null)
 * @method QuestionPosition|null findOneBy(array $criteria, array $orderBy = null)
 * @method QuestionPosition[]    findAll()
 * @method QuestionPosition[]    findBy(array $criteria, array $orderBy = null, $limit = null, $offset = null)
 */
class QuestionPositionRepository extends ServiceEntityRepository
{
    public function __construct(ManagerRegistry $registry)
    {
        parent::__construct($registry, QuestionPosition::class);
    }

    // /**
    //  * @return QuestionPosition[] Returns an array of QuestionPosition objects
    //  */
    /*
    public function findByExampleField($value)
    {
        return $this->createQueryBuilder('q')
            ->andWhere('q.exampleField = :val')
            ->setParameter('val', $value)
            ->orderBy('q.id', 'ASC')
            ->setMaxResults(10)
            ->getQuery()
            ->getResult()
        ;
    }
    */

    /*
    public function findOneBySomeField($value): ?QuestionPosition
    {
        return $this->createQueryBuilder('q')
            ->andWhere('q.exampleField = :val')
            ->setParameter('val', $value)
            ->getQuery()
            ->getOneOrNullResult()
        ;
    }
    */
}
