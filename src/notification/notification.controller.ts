import { Controller, Get, Param, Patch, Req, UseGuards } from '@nestjs/common';
import { RequestWithUser } from '../user-client/client.controller';
import { ApiBearerAuth, ApiOperation } from '@nestjs/swagger';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { GetClientNotificationsQuery } from './queries/getUserNotifications/impl/get-client-notifications.query';
import { Notification } from './entities/notification.entity';
import { MarkNotificationAsReadCommand } from './commands/markNotificationAsRead/impl/mark-notification-as-read.command';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@UseGuards(JwtAuthGuard)
@ApiBearerAuth()
@Controller('/client/notifications')
export class NotificationController {
  constructor(
    private readonly queryBus: QueryBus,
    private commandBus: CommandBus,
  ) {}

  @Get()
  @ApiOperation({
    summary: "Get all user's notifications",
  })
  async getUserNotifications(
    @Req() request: RequestWithUser,
  ): Promise<Notification[]> {
    return await this.queryBus.execute(
      new GetClientNotificationsQuery(request.user.id),
    );
  }

  @Patch('/read/:uuid')
  @ApiOperation({
    summary: 'Marking notification as read',
  })
  async markAsRead(
    @Param('uuid') notificationId: string,
    @Req() request: RequestWithUser,
  ): Promise<Notification> {
    return this.commandBus.execute(
      new MarkNotificationAsReadCommand(notificationId, request.user.id),
    );
  }
}
