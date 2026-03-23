import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Message } from 'src/domain/entity/message';
import { Repository } from 'typeorm';


@Injectable()
export class MessagesService {
  constructor(
    @InjectRepository(Message)
    private readonly messageRepository: Repository<Message>,
  ) {}

  async create(dto: any) {
    const message = this.messageRepository.create(dto);

    return await this.messageRepository.save(message);
  }

  async findAll() {
    return await this.messageRepository.find({
      order: { createdAt: 'ASC' },
    });
  }

  async findOne(id: string) {
    const message = await this.messageRepository.findOne({
      where: { id },
    });

    if (!message) {
      throw new NotFoundException('Message not found');
    }

    return message;
  }

  async update(id: string, dto: any) {
    const message = await this.findOne(id);

    Object.assign(message, dto);

    return await this.messageRepository.save(message);
  }

  async remove(id: string) {
    const message = await this.findOne(id);

    return await this.messageRepository.remove(message);
  }

  async findRoomMessages(roomId: string) {
    return await this.messageRepository.find({
      where: { roomId },
      order: { createdAt: 'ASC' },
    });
  }
}