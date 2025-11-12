import { Request, Response } from 'express';
import { prisma, Prisma } from '@repo/product-db';

export const getAll = async (req: Request, res: Response) => {
  const { sort, category, search, limit } = req.query;

  const orderBy = (() => {
    switch (sort) {
      case 'asc':
        return { price: Prisma.SortOrder.asc };
      case 'desc':
        return { price: Prisma.SortOrder.desc };
      case 'oldest':
        return { createdAt: Prisma.SortOrder.asc };
      default:
        return { createdAt: Prisma.SortOrder.desc };
    }
  })();

  const product = await prisma.product.findMany({
    where: {
      category: { slug: category as string },
      name: {
        contains: search as string,
        mode: 'insensitive',  // ILIKE
      },
    },
    orderBy,
    take: limit ? Number(limit) : undefined,
  });

  res.json(product);
};

export const getOne = async (req: Request, res: Response) => {
  const { id } = req.params;
  const product = await prisma.product.findUnique({ where: { id: Number(id) } });
  res.json(product);
};

export const create = async (req: Request, res: Response) => {
  const data: Prisma.ProductCreateInput = req.body;
  const { colors, images } = data;
  if (!colors || !Array.isArray(colors) || colors.length === 0) {
    return res.status(400).json({ message: 'Colors must be an array.' });
  }
  if (!images || typeof images !== 'object') {
    return res.status(400).json({ message: 'Images must be an object.' });
  }

  const missingColors = colors.filter((color) => !(color in images));
  if (missingColors.length > 0) {
    return res.status(400).json({ message: 'Missing images for colors.', missingColors });
  }

  const product = await prisma.product.create({ data });
  res.status(201).json(product);
};

export const update = async (req: Request, res: Response) => {
  const { id } = req.params;
  const data: Prisma.ProductUpdateInput = req.body;

  const updatedProduct = await prisma.product.update({
    where: { id: Number(id) },
    data,
  });

  res.json(updatedProduct);
};

export const destroy = async (req: Request, res: Response) => {
  const { id } = req.params;

  const deletedProduct = await prisma.product.delete({ where: { id: Number(id) } });
  res.json(deletedProduct);
};
