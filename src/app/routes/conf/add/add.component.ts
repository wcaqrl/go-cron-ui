import { HttpParams } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { SFSchema, SFUISchema } from '@delon/form';
import { _HttpClient } from '@delon/theme';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NzModalRef } from 'ng-zorro-antd/modal';

@Component({
  selector: 'app-conf-add',
  templateUrl: './add.component.html',
})
export class ConfAddComponent implements OnInit {
  record: any = {};
  submitting = true;

  schema: SFSchema = {
    properties: {
      conf_key: {
        type: 'string',
        title: '配置名称',
        minLength: 3,
        maxLength: 15
      },
      conf_val: {
        type: 'string',
        title: '配置详情',
        minLength: 5,
        maxLength: 120
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

  constructor(private http: _HttpClient, private msg: NzMessageService, private modal: NzModalRef) { }

  ngOnInit(): void {
  }

  submit(value: any): void {
    const conf = this.convertValue(value);
    if (conf === false) {
      this.msg.error('参数错误');
      this.modal.close(true);
      return;
    }
    this.http.post(`/conf/save`, new HttpParams().set('conf', JSON.stringify(conf))).subscribe(res => {
      this.msg.success('添加成功');
      this.modal.close(true);
    });
  }

  convertValue(value: any): any {
    if (value.hasOwnProperty('conf_key') && value.hasOwnProperty('conf_val')) {
      const conf_key = value.conf_key.toString();
      const conf_val = value.conf_val.toString();
      return {[conf_key]: conf_val};
    } else {
      return false;
    }
  }

  close(): void {
    this.modal.destroy();
  }

}
