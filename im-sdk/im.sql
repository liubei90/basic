drop table if exists sdk.im_message;
create table sdk.im_message (
  id varchar(36) not null comment "消息id",
  owner_group varchar(255) not null comment "消息归属群",
  owner_member varchar(255) not null comment "消息归属",
  tmessage varchar(2000) default null comment "文本消息",
  bmessage LONGBLOB default null comment "二进制消息",
  message_meta varchar(2000) default null comment "消息元数据",
  message_type varchar(255) default null comment "消息类型",
  status tinyint unsigned comment "消息状态 0 未发送 1 发送中 2 发送成功 3 接收成功",
  create_on datetime not null default CURRENT_TIMESTAMP comment "创建时间",
  update_on datetime not null default CURRENT_TIMESTAMP on update CURRENT_TIMESTAMP comment "更新时间",
  is_deleted tinyint(1) unsigned default 0 comment "软删除标志",
  primary key (`id`)
) ENGINE = InnoDB DEFAULT CHARSET = utf8 comment "【im模块】消息表";

drop table if exists sdk.im_message_send_result;
create table sdk.im_message_send_result(
  id varchar(36) not null comment "结果id",
  message_id varchar(36) not null comment "消息id",
  owner_group varchar(255) not null comment "消息归属组",
  owner_member varchar(255) not null comment "消息归属",
  receiver_member varchar(255) not null comment "消息接收者",
  create_on datetime not null default CURRENT_TIMESTAMP comment "创建时间",
  update_on datetime not null default CURRENT_TIMESTAMP on update CURRENT_TIMESTAMP comment "更新时间",
  is_deleted tinyint(1) unsigned default 0 comment "软删除标志",
  primary key (`id`)
) ENGINE = InnoDB DEFAULT CHARSET = utf8 comment "【im模块】消息发送结果表";

drop table if exists sdk.im_group;
create table sdk.im_group (
  id varchar(36) not null comment "群id",
  name varchar(255) not null comment "群名称",
  remark varchar(1000) not null comment "群公告",
  group_owner varchar(255) not null comment "群主id",
  create_on datetime not null default CURRENT_TIMESTAMP comment "创建时间",
  update_on datetime not null default CURRENT_TIMESTAMP on update CURRENT_TIMESTAMP comment "更新时间",
  is_deleted tinyint(1) unsigned default 0 comment "软删除标志",
  primary key (`id`)
) ENGINE = InnoDB DEFAULT CHARSET = utf8 comment "【im模块】群表";

drop table if exists sdk.im_group_member;
create table sdk.im_group_member (
  id varchar(36) not null comment "群成员记录id",
  group_id varchar(36) not null comment "群id",
  member_id varchar(255) not null comment "群成员id",
  member_nickname varchar(255) not null comment "群成员昵称",
  create_on datetime not null default CURRENT_TIMESTAMP comment "创建时间",
  update_on datetime not null default CURRENT_TIMESTAMP on update CURRENT_TIMESTAMP comment "更新时间",
  is_deleted tinyint(1) unsigned default 0 comment "软删除标志",
  primary key (`id`)
) ENGINE = InnoDB DEFAULT CHARSET = utf8 comment "【im模块】群成员表";