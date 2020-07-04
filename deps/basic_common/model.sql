drop table if exists sdk.modules;
create table sdk.modules (
  id varchar(36) not null comment "模块id",
  name varchar(255) not null comment "模块名",
  domain varchar(255) not null comment "部署域名",
  domain_pub varchar(255) default null comment "部署外网域名",
  port varchar(255) not null default "80" comment "服务端口",
  create_on datetime not null default CURRENT_TIMESTAMP comment "创建时间",
  update_on datetime not null default CURRENT_TIMESTAMP on update CURRENT_TIMESTAMP comment "更新时间",
  is_deleted tinyint(1) unsigned default 0 comment "软删除标志",
  primary key (`id`)
) ENGINE = InnoDB DEFAULT CHARSET = utf8 comment "模块表";

drop table if exists sdk.module_data_sources;
create table sdk.module_data_sources (
  id varchar(36) not null comment "模块数据来源id",
  name varchar(255) not null comment "模块数据来源id名",
  module_id varchar(36) not null comment "模块id",
  type varchar(255) not null default "api" comment "数据类型， api/raw",
  api_path varchar(255) default null comment "api接口",
  method varchar(36) default null comment "api请求方法",
  prefix varchar(255) not null comment "接口前缀",
  raw_data text default null comment "数据",
  create_on datetime not null default CURRENT_TIMESTAMP comment "创建时间",
  update_on datetime not null default CURRENT_TIMESTAMP on update CURRENT_TIMESTAMP comment "更新时间",
  is_deleted tinyint(1) unsigned default 0 comment "软删除标志",
  primary key (`id`)
) ENGINE = InnoDB DEFAULT CHARSET = utf8 comment "模块数据来源表";


-- auth-sdk内部模块
insert into sdk.modules (id, name, domain, port) values
('21b01758-bdf1-11ea-a745-54e1ad77c3de', 'auth-sdk', '127.0.0.1', '10010');

-- 用户详情
delete from sdk.module_data_sources where id = '6e63b954-bdf1-11ea-a745-54e1ad77c3de';
insert into sdk.module_data_sources (id, name, module_id, type, api_path, method, prefix, raw_data) values
('6e63b954-bdf1-11ea-a745-54e1ad77c3de', 'user-detail', '21b01758-bdf1-11ea-a745-54e1ad77c3de', 'api', '/user-detail', 'post', '', null);

-- 用户jwt是否有效
delete from sdk.module_data_sources where id = '1683be3a-bdf8-11ea-a745-54e1ad77c3de';
insert into sdk.module_data_sources (id, name, module_id, type, api_path, method, prefix, raw_data) values
('1683be3a-bdf8-11ea-a745-54e1ad77c3de', 'verify-authorization', '21b01758-bdf1-11ea-a745-54e1ad77c3de', 'api', '/verify-authorization', 'post', '', null);
