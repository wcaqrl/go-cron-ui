import { HttpParams } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { SFSchema, SFUISchema } from '@delon/form';
import { _HttpClient } from '@delon/theme';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NzModalRef } from 'ng-zorro-antd/modal';

@Component({
  selector: 'app-job-edit',
  templateUrl: './edit.component.html',
})
export class JobEditComponent implements OnInit {
  url = '/job/detail';
  record: any = {};
  i: any;
  schema: SFSchema = {
    properties: {
      name: {
        type: 'string',
        title: 'job名称',
        minLength: 3,
        maxLength: 15,
        readOnly: true
      },
      command: {
        type: 'string',
        title: 'Shell命令',
        minLength: 5,
        maxLength: 120
      },
      cronExpr: {
        type: 'string',
        title: 'Cron表达式',
        minLength: 12,
        maxLength: 30
      },
      ipList: {
        type: 'string',
        title: 'ip列表',
        minLength: 8,
      },
      status: {
        type: 'integer',
        title: '状态',
        default: 0,
      }
    },
    required: ['name', 'command', 'cronExpr', 'ipList', 'status'],
  };
  ui: SFUISchema = {
    '*': {
      spanLabelFixed: 100,
      grid: { span: 12 },
    },
    $name: {
      widget: 'string',
    },
    $command: {
      widget: 'string',
    },
    $cronExpr: {
      widget: 'string',
    },
    $ipList: {
      widget: 'textarea'
    },
    $status: {
      widget: 'boolean',
    }
  };

  constructor(
    private modal: NzModalRef,
    private msgSrv: NzMessageService,
    public http: _HttpClient,
  ) {}

  ngOnInit(): void {
    if (this.record.name !== '') {
      this.http.get(this.url, {name: this.record.name}).subscribe(res => (this.i = res));
    }
  }

  save(value: any): void {
    // 将ip列表转成逗号
    value.ipList = value.ipList.toString().split(',');
    value.status = value.status ? 1 : 0;
    this.http.post(`/job/save`, new HttpParams().set('job', JSON.stringify(value))).subscribe(res => {
      this.msgSrv.success('修改成功');
      this.modal.close(true);
    });
  }

  close(): void {
    this.modal.destroy();
  }
}
