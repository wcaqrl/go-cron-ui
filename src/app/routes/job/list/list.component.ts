import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { STChange, STColumn, STComponent, STData, STPage, STReq, STColumnTag } from '@delon/abc/st';
import { ModalHelper, _HttpClient } from '@delon/theme';
import { NzSafeAny } from 'ng-zorro-antd/core/types';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NzModalService } from 'ng-zorro-antd/modal';
import { map, tap } from 'rxjs/operators';
import { JobAddComponent } from '../add/add.component';
import { JobEditComponent } from '../edit/edit.component';
import { HttpParams } from '@angular/common/http';

const TAG: STColumnTag = {
  0: { text: '不可用', color: 'red' },
  1: { text: '可用', color: 'green' },
};

@Component({
  selector: 'app-job-list',
  templateUrl: './list.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class JobListComponent implements OnInit {
  url = '/job/list';
  totalUrl = '/job/count';
  name = '';
  originPerpage = 15;
  page = 1;
  perpage = this.originPerpage;
  total = 0;
  data: any;
  pagination: STPage = {
    front: false,
    position: 'bottom',
    placement: 'right',
    show: true,
    total: true,
  };
  loading = false;
  @ViewChild('st', { static: true })
  st!: STComponent;
  columns: STColumn[] = [
    { title: '任务名称', index: 'name', sort: 'name' },
    { title: 'Shell命令', index: 'command' },
    { title: 'Crontab 表达式', index: 'cronExpr' },
    { title: '服务器地址', index: 'ipList' },
    { title: '状态', index: 'status', type: 'tag', tag: TAG },
    {
      title: '操作',
      buttons: [
        { text: '执行', click: (item: any) => {
            this.http.post('/job/exec', new HttpParams().set('name', item.name)).subscribe(() => {
              this.msg.success(`执行${item.name}成功`);
            });
          }
        },
        { text: '编辑', type: 'modal', modal: {paramsName: 'record'}, component: JobEditComponent, click: (record: any) => {
            this.modal.create(JobEditComponent, { record }, { size: 'md' }).subscribe(
              () => {
                this.st.reload();
              }
            );
          }
        },
        { text: '删除', click: (item: any) => {
            this.http.get(`/job/delete?name=${item.name}`).subscribe(() => {
              this.msg.success(`删除${item.name}成功`);
              this.st.reload();
            });
          }
        },
        { text: '强杀', click: (item: any) => {
            this.http.get(`/job/kill?name=${item.name}`).subscribe(() => {
              this.msg.success(`强杀${item.name}成功`);
            });
          }
        },
      ],
    },
  ];
  expandForm = false;

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
      .get(this.url, {page: this.page, perpage: this.perpage, name: this.name})
      .subscribe((res) => {
        this.data = res;
        this.cdr.detectChanges();
      });
  }

  getTotal(): void {
    this.http.get(this.totalUrl, {name: this.name}).subscribe((res) => {
      this.total = res.hasOwnProperty('count') ? res.count : 0;
      this.cdr.detectChanges();
    });
  }

  add(): void {
    this.modal.createStatic(JobAddComponent, {record: {show: false, title: '添加任务'}}, { size: 'md' }).subscribe(
      () => {
        this.msg.success('任务添加成功');
        this.st.reload();
      }
    );
  }

  reset(): void {
    setTimeout(() => {
      this.name = '';
      this.getData();
    });
  }

  change(e: STChange): void {
    if (e.type === 'click' || e.type === 'dblClick') {
      return;
    }
    if (e.type !== 'loaded') {
      if (e.type === 'pi' || e.type === 'ps') {
        this.page = e.pi;
        this.perpage = e.ps;
        this.getList();
      } else {
        this.page = e.pi;
        this.perpage = e.ps;
        this.getData();
      }
    }
  }

}
