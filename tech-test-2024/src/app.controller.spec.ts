import { Test, TestingModule } from '@nestjs/testing';
import { AppController } from './app.controller';
import { AppService } from './app.service';

describe('AppController', () => {
  let appController: AppController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [AppController],
      providers: [AppService],
    }).compile();

    appController = app.get<AppController>(AppController);
  });

  describe('delivery information', () => {
    it('should return delivery information response with correct structure', () => {
      expect(
        appController.getDeliveryInformationByUserId('123'),
      ).toHaveProperty('catNames');

      expect(
        appController.getDeliveryInformationByUserId('123'),
      ).toHaveProperty('userName');

      expect(
        appController.getDeliveryInformationByUserId('123'),
      ).toHaveProperty('totalPrice');

      expect(
        appController.getDeliveryInformationByUserId('123'),
      ).toHaveProperty('freeGift');
    });
  });
});
