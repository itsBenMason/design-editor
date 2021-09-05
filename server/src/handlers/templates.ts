import { NextFunction, Response, Request } from "express";
import TemplatesController from "../controllers/templates";

class TemplatesHandler {
  private controller: TemplatesController;
  constructor() {
    this.controller = new TemplatesController();
    this.get = this.get.bind(this);
    this.create = this.create.bind(this);
    this.getById = this.getById.bind(this);
    this.update = this.update.bind(this);
    this.remove = this.remove.bind(this);
  }

  public async get(req: Request, res: Response, next: NextFunction) {
    try {
      const templates = await this.controller.get();
      return res.send(templates);
    } catch (err) {
      next(err);
    }
  }

  public async getById(req: Request, res: Response, next: NextFunction) {
    try {
      const id = req.params.id as string;
      const template = await this.controller.getById(id);
      return res.send(template);
    } catch (err) {
      next(err);
    }
  }

  public async create(req: Request, res: Response, next: NextFunction) {
    try {
      const data = req.body;
      const template = await this.controller.create(data);
      return res.send(template);
    } catch (err) {
      next(err);
    }
  }

  public async update(req: Request, res: Response, next: NextFunction) {
    try {
      const id = req.params.id;
      const data = req.body;
      const template = await this.controller.update(id, data);
      return res.send(template);
    } catch (err) {
      next(err);
    }
  }

  public async remove(req: Request, res: Response, next: NextFunction) {
    try {
      const id = req.params.id;
      const template = await this.controller.remove(id);
      return res.send(template);
    } catch (err) {
      next(err);
    }
  }
}

export default TemplatesHandler;
