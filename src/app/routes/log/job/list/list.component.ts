import { ChangeDetectorRef, Component, EventEmitter, OnInit, ViewChild } from '@angular/core';
import { STChange, STColumn, STComponent, STPage } from '@delon/abc/st';
import { SFDateWidgetSchema, SFSchema } from '@delon/form';
import { ModalHelper, _HttpClient } from '@delon/theme';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NzModalService } from 'ng-zorro-antd/modal';

@Component({
  selector: 'app-log-list',
  templateUrl: './list.component.html',
})
export class LogListComponent implements OnInit {
  url = `/job/log/list`;
  totalUrl = '/job/log/count';
  originPerpage = 15;
  total = 0;
  data: any;
  q: {
    page: number;
    perpage: number;
    name: string;
    ip_addr: string;
    command: string;
    errorCode: number;
    msg: string;
    traceID: string;
    start_time: number;
    end_time: number;
    sort: string;
  } = {
    page: 1,
    perpage: this.originPerpage,
    name: '',
    ip_addr: '',
    command: '',
    errorCode: 0,
    msg: '',
    traceID: '',
    start_time: 0,
    end_time: 0,
    sort: '',
  };
  pagination: STPage = {
    front: false,
    position: 'bottom',
    placement: 'right',
    show: true,
    total: true,
  };
  loading = false;

  searchSchema: SFSchema = {
    properties: {
      name: {
        type: 'string',
        title: '任务名称'
      },
      ip_addr: {
        type: 'string',
        title: 'ip地址'
      },
      command: {
        type: 'string',
        title: 'Shell命令'
      },
      errorCode: {
        type: 'number',
        title: '错误码'
      },
      msg: {
        type: 'string',
        title: '错误消息'
      },
      traceID: {
        type: 'string',
        title: '追踪ID'
      },
      start_time: {
        type: 'string',
        title: '开始时间',
        ui: { widget: 'date', mode: 'date', showTime: true,  displayFormat: 'yyyy-MM-dd HH:mm:ss', format: 't'} as SFDateWidgetSchema,
      },
      end_time: {
        type: 'string',
        title: '截止时间',
        ui: { widget: 'date', mode: 'date', showTime: true,  displayFormat: 'yyyy-MM-dd HH:mm:ss', format: 't'} as SFDateWidgetSchema,
      }
    }
  };
  @ViewChild('st') private readonly st!: STComponent;
  columns: STColumn[] = [
    { title: 'IP地址', index: 'ip_addr' },
    { title: '任务名称', index: 'job_name' },
    { title: 'Shell命令', index: 'command' },
    { title: '调用结果', index: 'err' },
    { title: '计划时间', type: 'date', dateFormat: 'yyyy-MM-dd HH:mm:ss.SSS', index: 'plan_time' },
    { title: '调度时间', type: 'date', dateFormat: 'yyyy-MM-dd HH:mm:ss.SSS', index: 'schedule_time' },
    { title: '开始时间', type: 'date', dateFormat: 'yyyy-MM-dd HH:mm:ss.SSS', index: 'start_time' },
    { title: '结束时间', type: 'date', dateFormat: 'yyyy-MM-dd HH:mm:ss.SSS', index: 'end_time' },
    { title: '追踪ID', index: 'traceID' },
    { title: '错误码', index: 'errorCode' },
    { title: '错误消息', index: 'msg' },
  ];

  constructor(private http: _HttpClient, private modal: ModalHelper, public msg: NzMessageService, private modalSrv: NzModalService, private cdr: ChangeDetectorRef) {}

  ngOnInit(): void {
    this.getData();
  }

  getData(): void {
    this.getList();
    this.getTotal();
  }

  getList(): void {
    this.http
      .get(this.url, this.filterParams(this.q))
      .subscribe((res) => {
        this.data = res;
        this.cdr.detectChanges();
      });
  }

  getTotal(): void {
    this.http.get(this.totalUrl, this.filterParams(this.q)).subscribe((res) => {
      this.total = res.hasOwnProperty('count') ? res.count : 0;
      this.cdr.detectChanges();
    });
  }

  filterParams(obj: object): any {
    const params = {};
    for (const key in obj) {
      // @ts-ignore
      if (obj.hasOwnProperty(key) && obj[key]) {
        // @ts-ignore
        params[key] = obj[key];
      }
    }
    return params;
  }

  submit(e: object): void {
    setTimeout(() => {
      for (const key in e) {
        if (e.hasOwnProperty(key) && this.q.hasOwnProperty(key)) {
          // @ts-ignore
          this.q[key] = e[key];
        }
      }
      this.getData();
    });
  }

  reset(): void {
    setTimeout(() => {
      this.q = {
        page: 1,
        perpage: this.originPerpage,
        name: '',
        ip_addr: '',
        command: '',
        errorCode: 0,
        msg: '',
        traceID: '',
        start_time: 0,
        end_time: 0,
        sort: '',
      };
      this.getData();
    });
  }

  change(e: STChange): void {
    if (e.type === 'click' || e.type === 'dblClick') {
      return;
    }
    if (e.type !== 'loaded') {
      if (e.type === 'pi' || e.type === 'ps') {
        this.q.page = e.pi;
        this.q.perpage = e.ps;
        this.getList();
      } else {
        this.q.page = e.pi;
        this.q.perpage = e.ps;
        this.getData();
      }
    }
  }

}
