<?php

declare(strict_types=1);

namespace App\GraphQL\Resolver;

use App\Entity\Product;
use Doctrine\ORM\EntityManagerInterface;
use GraphQL\Type\Definition\ResolveInfo;
use Overblog\GraphQLBundle\Definition\Argument;
use Overblog\GraphQLBundle\Definition\Resolver\ResolverInterface;

class ProductResolver implements ResolverInterface {

    /**
     * @var EntityManagerInterface
     */
    protected $em;

    public function __construct(EntityManagerInterface $em)
    {
        $this->em = $em;
    }

    public function __invoke(ResolveInfo $info, $value, Argument $args)
    {
        $method = $info->fieldName;
        return $this->$method($value, $args);
    }

    public function resolve(int $id) :Product
    {
        return $this->em->find(Product::class, $id);
    }

    public function allProduct() : array
    {
        return $this->em->getRepository(Product::class)->findAll();
    }

    public function id(Product $product) :int
    {
        return $product->getId();
    }

    public function name(Product $product) :string
    {
        return $product->getName();
    }
}