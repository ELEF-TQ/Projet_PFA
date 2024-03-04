import { Controller, Get, Post, Body, Patch, Param, Delete, HttpException } from '@nestjs/common';
import { ConversionsService } from './conversions.service';
// import { CreateConversionDto } from './dto/create-conversion.dto';
// import { UpdateConversionDto } from './dto/update-conversion.dto';

@Controller('conversions')
export class ConversionsController {
  constructor(private readonly conversionsService: ConversionsService) {}

  @Post("/:pompisteId")
  async create(@Param("pompisteId") pompisteId: string) {
    const conversion = await this.conversionsService.create(pompisteId);
    // if(!conversion){
    //   throw new HttpException("")
    // }
  }

  // @Get()
  // findAll() {
  //   return this.conversionsService.findAll();
  // }

  // @Get(':id')
  // findOne(@Param('id') id: string) {
  //   return this.conversionsService.findOne(id);
  // }

  // @Patch(':id')
  // update(@Param('id') id: string) {
  //   return this.conversionsService.update(id);
  // }

  @Post('acceptAll')
  async updateAll(@Body() ids: string[]) {
    try {
      const updatedConversions = await this.conversionsService.updateAll(ids);
      return { success: true, data: updatedConversions };
    } catch (error) {
      return { success: false, message: error.message };
    }
  }



}