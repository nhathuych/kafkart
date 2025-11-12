import { Request, Response } from 'express';
import { prisma, Prisma } from '@repo/product-db';

export const getAll = async (req: Request, res: Response) => {
  const categories = await prisma.category.findMany();
  res.json(categories);
};

export const getOne = async (req: Request, res: Response) => {
  const { id } = req.params;
  const category = await prisma.category.findUnique({ where: { id: Number(id) } });
  res.json(category);
};

export const create = async (req: Request, res: Response) => {
  const data: Prisma.CategoryCreateInput = req.body;
  const category = await prisma.category.create({ data });

  res.status(201).json(category);
};

export const update = async (req: Request, res: Response) => {
  const { id } = req.params;
  const data: Prisma.CategoryUpdateInput = req.body;

  const category = await prisma.category.update({
    where: { id: Number(id) },
    data,
  });

  res.json(category);
};

export const destroy = async (req: Request, res: Response) => {
  const { id } = req.params;

  const category = await prisma.category.delete({ where: { id: Number(id) } });

  res.json(category);
};
