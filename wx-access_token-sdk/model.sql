drop table if exists sdk.wx_access_token;
create table sdk.wx_access_token (
  id varchar(36) not null comment "消息id",
  appid varchar(127) not null comment "token所属应用",
  grant_type varchar(63) not null comment "默认client_credential",
  access_token varchar(1023) not null comment "token",
  expires_in int(11) not null comment "过期秒数",
  expires_date datetime not null comment "过期时间",
  content text default null comment "接口返回结果",
  create_on datetime not null default CURRENT_TIMESTAMP comment "创建时间",
  update_on datetime not null default CURRENT_TIMESTAMP on update CURRENT_TIMESTAMP comment "更新时间",
  is_deleted tinyint(1) unsigned default 0 comment "软删除标志",
  primary key (`id`)
) ENGINE = InnoDB DEFAULT CHARSET = utf8 comment "【wx模块】access_token缓存表";