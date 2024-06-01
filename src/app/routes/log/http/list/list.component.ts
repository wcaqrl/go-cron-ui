import { ChangeDetectorRef, Component, EventEmitter, OnInit, ViewChild } from '@angular/core';
import { STChange, STColumn, STComponent, STPage } from '@delon/abc/st';
import { SFDateWidgetSchema, SFSchema, SFSelectWidgetSchema } from '@delon/form';
import { ModalHelper, _HttpClient } from '@delon/theme';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NzModalService } from 'ng-zorro-antd/modal';

@Component({
  selector: 'app-log-list',
  templateUrl: './list.component.html',
})
export class LogListComponent implements OnInit {
  url = `/api/log/list`;
  totalUrl = '/api/log/count';
  originPerpage = 15;
  total = 0;
  data: any;
  q: {
    project: string;
    page: number;
    perpage: number;
    ip_addr: string;
    domain: string;
    http_method: string;
    http_code: number;
    response_time: number;
    request_route: string;
    request_param: string;
    user_agent: string;
    start_time: number;
    end_time: number;
    sort: string;
  } = {
    project: 'orange',
    page: 1,
    perpage: this.originPerpage,
    ip_addr: '',
    domain: '',
    http_method: '',
    http_code: 0,
    response_time: 0,
    request_route: '',
    request_param: '',
    user_agent: '',
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
      project: {
        type: 'string',
        title: '项目名称',
        enum: [
          { label: 'orange', value: 'orange' },
          { label: 'open-api', value: 'open-api' },
          { label: 'tvapi', value: 'tvapi' },
          { label: 'tvcms', value: 'orange' },
        ],
        default: 'orange',
        ui: {
          widget: 'select',
        } as SFSelectWidgetSchema,
      },
      ip_addr: {
        type: 'string',
        title: 'IP地址'
      },
      domain: {
        type: 'string',
        title: '域名'
      },
      http_method: {
        type: 'string',
        title: '请求方法'
      },
      http_code: {
        type: 'number',
        title: '响应码'
      },
      response_time: {
        type: 'number',
        title: '响应时长'
      },
      request_route: {
        type: 'string',
        title: '请求路由'
      },
      request_param: {
        type: 'string',
        title: '请求参数'
      },
      user_agent: {
        type: 'string',
        title: '请求代理'
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
    { title: 'ID', index: 'id' },
    { title: '真实IP', index: 'real_ip' },
    { title: '请求时间', type: 'date', dateFormat: 'yyyy-MM-dd HH:mm:ss', index: 'request_time' },
    { title: '请求域名', index: 'domain' },
    { title: '请求方法', index: 'http_method' },
    { title: '请求路由', index: 'request_route' },
    { title: '请求参数', index: 'request_param' },
    { title: '请求代理', index: 'user_agent' },
    { title: '响应代码', index: 'http_code' },
    { title: '响应时间', index: 'response_time' },
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
        project: 'orange',
        page: 1,
        perpage: this.originPerpage,
        ip_addr: '',
        domain: '',
        http_method: '',
        http_code: 0,
        response_time: 0,
        request_route: '',
        request_param: '',
        user_agent: '',
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
