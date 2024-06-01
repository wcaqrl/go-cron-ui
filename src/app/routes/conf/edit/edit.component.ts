import { HttpParams } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { SFSchema, SFUISchema } from '@delon/form';
import { _HttpClient } from '@delon/theme';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NzModalRef } from 'ng-zorro-antd/modal';

@Component({
  selector: 'app-conf-edit',
  templateUrl: './edit.component.html',
})
export class ConfEditComponent implements OnInit {
  url = '/conf/detail';
  record: any = {};
  i: any;
  schema: SFSchema = {
    properties: {
      conf_key: {
        type: 'string',
        title: '配置名称',
        readOnly: true,
        minLength: 5
      },
      conf_val: {
        type: 'string',
        title: '配置详情',
        minLength: 5
      }
    },
    required: ['conf_key', 'conf_val'],
  };

  ui: SFUISchema = {
    '*': {
      spanLabelFixed: 100,
      grid: { span: 12 },
    },
    $conf_key: {
      grid: {span: 24},
      widget: 'string',
    },
    $conf_val: {
      autosize: {minRows: 30},
      grid: { span: 24 },
      widget: 'textarea'
    },
  };


  constructor(
    private modal: NzModalRef,
    private msgSrv: NzMessageService,
    public http: _HttpClient,
  ) {}

  ngOnInit(): void {
    if (this.record.conf_key !== '') {
      let conf_key = this.record.conf_key;
      const conf_prefix = '/api/conf/';
      if (this.record.conf_key.toString().lastIndexOf(conf_prefix) !== false) {
        conf_key = this.record.conf_key.toString().substring(conf_prefix.length);
      }
      this.http.get(this.url, {key: conf_key}).subscribe(res => {
        this.i = res;
      });
    }
  }

  save(value: any): void {
    const conf = this.convertValue(value);
    if (conf === false) {
      this.msgSrv.error('参数错误');
      this.modal.close(true);
      return;
    }
    this.http.post(`/conf/save`, new HttpParams().set('conf', JSON.stringify(conf))).subscribe(res => {
      this.msgSrv.success('修改成功');
      this.modal.close(true);
    });
  }

  convertValue(value: any): any {
    if (value.hasOwnProperty('conf_key') && value.hasOwnProperty('conf_val')) {
      const conf_prefix = '/api/conf/';
      let conf_key = value.conf_key.toString();
      const conf_val = value.conf_val.toString();
      if (conf_key.lastIndexOf(conf_prefix) !== false) {
        conf_key = conf_key.substring(conf_prefix.length);
        if (conf_key.length === 0 || conf_key === '') {
          return false;
        }
      } else {
        return false;
      }
      return {[conf_key]: conf_val};
    } else {
      return false;
    }
  }

  close(): void {
    this.modal.destroy();
  }
}
