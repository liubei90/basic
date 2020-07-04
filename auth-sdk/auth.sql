  -- id varchar(36) not null comment "消息id",
  -- create_on datetime not null default CURRENT_TIMESTAMP comment "创建时间",
  -- update_on datetime not null default CURRENT_TIMESTAMP on update CURRENT_TIMESTAMP comment "更新时间",
  -- is_deleted tinyint(1) unsigned default 0 comment "软删除标志",
  -- primary key (`id`)

drop table if exists sdk.auth_user;
create table sdk.auth_user (
  id varchar(36) not null comment "用户id",
  user_name varchar(63) not null comment "用户名",
  phone varchar(20) default null comment "手机",
  email varchar(128) default null comment "邮箱",
  sex tinyint(1) default null comment "性别 1男 2女",
  create_on datetime not null default CURRENT_TIMESTAMP comment "创建时间",
  update_on datetime not null default CURRENT_TIMESTAMP on update CURRENT_TIMESTAMP comment "更新时间",
  is_deleted tinyint(1) unsigned default 0 comment "软删除标志",
  primary key (`id`)
) ENGINE = InnoDB DEFAULT CHARSET = utf8 comment "【auth模块】用户表";

drop table if exists sdk.auth_local_auth;
create table sdk.auth_local_auth (
  id varchar(36) not null comment "授权id",
  user_id varchar(36) not null comment "用户id",
  password varchar(512) not null comment "密码",
  slat varchar(36) not null comment "盐",
  create_on datetime not null default CURRENT_TIMESTAMP comment "创建时间",
  update_on datetime not null default CURRENT_TIMESTAMP on update CURRENT_TIMESTAMP comment "更新时间",
  is_deleted tinyint(1) unsigned default 0 comment "软删除标志",
  primary key (`id`)
) ENGINE = InnoDB DEFAULT CHARSET = utf8 comment "【auth模块】用户登录密码表";

drop table if exists sdk.auth_sessions;
create table sdk.auth_sessions (
  id varchar(36) not null comment "session id",
  user_id varchar(36) not null comment "用户id",
  expire datetime default null comment "过期时间, null 永不过期",
  jwt text not null comment "用户jwt",
  create_on datetime not null default CURRENT_TIMESTAMP comment "创建时间",
  update_on datetime not null default CURRENT_TIMESTAMP on update CURRENT_TIMESTAMP comment "更新时间",
  is_deleted tinyint(1) unsigned default 0 comment "软删除标志",
  primary key (`id`)
) ENGINE = InnoDB DEFAULT CHARSET = utf8 comment "【auth模块】用户登录状态表";

