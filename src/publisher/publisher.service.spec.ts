import { Test, TestingModule } from '@nestjs/testing';
import { PublisherService } from './publisher.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Publisher } from '../entities/publisher.entity';
import { Repository } from 'typeorm';
import { hash } from 'bcrypt';
import { sign } from 'jsonwebtoken';
import { LoginPublisherDto } from '@/publisher/dto/login-publisher.dto';



describe('PublisherService', () => {

  let service: PublisherService;
  let publisherRepository: Repository<Publisher>

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
    publisherRepository = module.get<Repository<Publisher>>(getRepositoryToken(Publisher));
  });

  it('Проверяем что сервис доступен', () => {
    expect(service).toBeDefined();
  });
  it('Проверяем что репозиторий доступен', () => {
    expect(publisherRepository).toBeDefined();
  });



  describe('createPublisher', () => {
    it(`Проверяем что на сохранение в базу попадает пользователь с теми же данными, которые были получены в контроллере, 
        и перед сохранением генерируется refreshToken`, async () => {
      await service.createPublisher({
        username: 'testuser',
        password: '123',
        email: 'email@mail.ru'
      })
      expect(publisherRepository.save).toHaveBeenCalledWith({
        username: 'testuser',
        password: '123',
        email: 'email@mail.ru',
        refreshToken: expect.any(String)
      })
    })
  })

  describe('login',  () => {
    it(`Проверяем что выпадет Error из за того, что в базе нет такого пользователя`, async () => {
      const dto: LoginPublisherDto = {
        email: 'email@mail.ru',
        password: '123'
      }
      try {
        await  service.login(dto)
      } catch (err) {
        expect(err.status).toBe(404)
      }
    })
  })


  describe('generateToken', () => {
    it('Проверка генерации токенов', () => {
      const testPublisher: any = {
        id: 1,
        username: 'test',
        email: 'test',
      }
      const token: string = sign(testPublisher, 'secret', {expiresIn: 3000})
      expect(service.generateToken(testPublisher, 3000)).toEqual(token)

    })
  })

  describe('createPublisherResponse', () => {
    it('Проверка корректной генерации сущности ответа', () => {
      const testPublisher: any = {
        id: 1,
        email: 'mail@mail.ru',
        username: 'someName',
        refreshToken: expect.any(String),
      }

      expect(service.createPublisherResponse(testPublisher)).toEqual({
        id: 1,
        email: 'mail@mail.ru',
        username: 'someName',
        refreshToken: expect.any(String),
        token: expect.any(String),
      })

    })
  })

});

describe('PublisherService Part II',  () => {

  let service: PublisherService;

  let testPassword: string = '123'
  let hashingPassword: string = '';
  let testingPublisher: any = {};

  beforeEach(async () => {
    hashingPassword = await hash('123', 10)
    testingPublisher = {
      id: 1,
      email: 'mail@mail.ru',
      username: 'someName',
      refreshToken: expect.any(String),
      password: hashingPassword
    }

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        PublisherService,
        {
          provide: getRepositoryToken(Publisher),
          useValue: {
            findOne: jest.fn().mockResolvedValue(testingPublisher),
            update: jest.fn()
          }
        }
      ],
    }).compile();
    service = module.get<PublisherService>(PublisherService);

  });


  it(`Проверяем что выпадет Error из за того, что пароли не совпадают`, async () => {
    const dto: LoginPublisherDto = {
      email: 'email@mail.ru',
      password: testPassword + expect.any(String)
    }
    try {
      await  service.login(dto)
    } catch (err) {
      expect(err.status).toBe(404)
    }
  })


  it(`Проверяем что функция login отработает корректно при верных данных`, async () => {
    const dto: LoginPublisherDto = {
      email: 'email@mail.ru',
      password: testPassword
    }
      expect(await  service.login(dto)).toStrictEqual(testingPublisher)
  })

  describe('refreshTokens', () => {

    it('Проверяем что токены генерируются', async () => {
      expect(await service.refreshTokens(testingPublisher, testingPublisher.refreshToken)).toEqual({
        refreshToken: expect.any(String),
        accessToken: expect.any(String),
      })
    })

    it('Проверяем генерацию ошибки при невалидном токене', async () => {
      try{
        await service.refreshTokens(testingPublisher, testingPublisher.refreshToken+expect.any(String))
      } catch (err) {
        expect(err.status).toBe(400)
      }

    })

  })
})