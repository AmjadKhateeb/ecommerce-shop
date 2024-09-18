import { Request, Response } from 'express';
import { Repository } from 'typeorm';
import { AppDataSource } from '../db/dbConfig';
import { Hotline } from '../db/entities/hotline';

const hotlineRepository: Repository<Hotline> = AppDataSource.getRepository(Hotline);

// Create a new hotline
export const createHotline = async (req: Request, res: Response) => {
  const { hotlineNumber } = req.body;

  // Validation
  const errors: string[] = [];
  if (!hotlineNumber) errors.push('Hotline number is required');

  if (errors.length > 0) {
    return res.status(400).json({ errors });
  }

  const hotline = new Hotline();
  hotline.hotlineNumber = hotlineNumber;

  try {
    const result = await hotlineRepository.save(hotline);
    res.status(201).send(result);
  } catch (error) {
    res.status(500).send({ error: 'Failed to create hotline' });
  }
};

// Get all hotlines
export const getAllHotlines = async (req: Request, res: Response) => {
  try {
    const hotlines = await hotlineRepository.find();
    res.send(hotlines);
  } catch (error) {
    res.status(500).send({ error: 'Failed to retrieve hotlines' });
  }
};

// Get a hotline by ID
export const getHotlineById = async (req: Request, res: Response) => {
  const id = Number(req.params.id);

  try {
    const hotline = await hotlineRepository.findOne({
      where: { id },
    });

    if (!hotline) {
      return res.status(404).send({ error: 'Hotline not found' });
    }

    res.send(hotline);
  } catch (error) {
    res.status(500).send({ error: 'Failed to retrieve hotline' });
  }
};
