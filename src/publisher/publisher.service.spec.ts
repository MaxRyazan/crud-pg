import { Test, TestingModule } from '@nestjs/testing';
import { PublisherService } from './publisher.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Publisher } from '../entities/publisher.entity';
import { Repository } from 'typeorm';
import spyOn = jest.spyOn;


describe('PublisherService', () => {

  let service: PublisherService;
  let userRepo: Repository<Publisher>

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        PublisherService,
        {
          provide: getRepositoryToken(Publisher),
          useValue: {
            create: jest.fn(),
            findOne: jest.fn(),
            save: jest.fn()
          }
        }
      ],
    }).compile();
    service = module.get<PublisherService>(PublisherService);
    userRepo = module.get<Repository<Publisher>>(getRepositoryToken(Publisher))
  });

  it('Проверяем что сервис доступен', () => {
    expect(service).toBeDefined();
  });
  it('Проверяем что репозиторий доступен', () => {
    expect(userRepo).toBeDefined();
  });



  describe('createPublisher', () => {
    it(`Проверяем что на сохранение в базу попадает юзер с теми же данными, которые были получены в контроллере, 
        и перед сохранением генерируется refreshToken`, async () => {
      await service.createPublisher({
        username: 'testuser',
        password: '123',
        email: 'email@mail.ru'
      })
      expect(userRepo.save).toHaveBeenCalledWith({
        username: 'testuser',
        password: '123',
        email: 'email@mail.ru',
        refreshToken: expect.any(String)
      })
    })
  })



  describe('login',  () => {
    it(`Логин`, async () => {
      const dto = {
        email: 'email@mail.ru',
        password: '123'
      }
      await expect(service.login(dto)).rejects.toThrow();
    })
  })




});
