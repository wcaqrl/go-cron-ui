import { HttpParams } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { SFSchema, SFUISchema } from '@delon/form';
import { _HttpClient } from '@delon/theme';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NzModalRef } from 'ng-zorro-antd/modal';

@Component({
  selector: 'app-job-add',
  templateUrl: './add.component.html',
})
export class JobAddComponent implements OnInit {
  record: any = {};
  submitting = true;

  schema: SFSchema = {
    properties: {
      name: {
        type: 'string',
        title: 'job名称',
        minLength: 3,
        maxLength: 15
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
    },
  };

  constructor(private http: _HttpClient, private msg: NzMessageService, private modal: NzModalRef) { }

  ngOnInit(): void {
  }

  submit(value: any): void {
    if (this.submitting) {
      value.ipList = value.ipList.toString().split( ',' );
      value.status = value.status ? 1 : 0;
      this.http.post(`/job/save`, new HttpParams().set('job', JSON.stringify(value))).subscribe(res => {
        this.submitting = false;
        this.msg.success('添加成功');
        this.modal.close(true);
      });
    }
  }

  close(): void {
    this.modal.destroy();
  }

}
