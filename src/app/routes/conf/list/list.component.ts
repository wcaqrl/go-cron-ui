import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { STChange, STColumn, STComponent, STData, STPage, STReq } from '@delon/abc/st';
import { ModalHelper, _HttpClient } from '@delon/theme';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NzModalService } from 'ng-zorro-antd/modal';
import { ConfAddComponent } from '../add/add.component';
import { ConfEditComponent } from '../edit/edit.component';

@Component({
  selector: 'app-conf-list',
  templateUrl: './list.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ConfListComponent implements OnInit {
  url = '/conf/list';
  totalUrl = '/conf/count';
  key = '';
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
    { title: '配置名称', index: 'conf_key', sort: 'conf_key' },
    { title: '配置详情', index: 'conf_val' },
    {
      title: '操作',
      buttons: [
        { text: '编辑', type: 'modal', modal: {paramsName: 'record'}, component: ConfEditComponent, click: (record: any) => {
              this.modal.create(ConfEditComponent, { record }, { size: 'md' }).subscribe(
              () => {
                this.st.reload();
              }
            );
          }
        },
        { text: '删除', click: (item: any) => {
            const conf_prefix = '/api/conf/';
            let del_key = item.conf_key;
            if (item.conf_key.toString().lastIndexOf(conf_prefix) !== false) {
              del_key = item.conf_key.toString().substring(conf_prefix.length);
            }
            this.http.get(`/conf/delete?key=${del_key}`).subscribe(() => {
              this.msg.success(`删除${item.conf_key}成功`);
              this.st.reload();
            });
          }
        }
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
      .get(this.url, {page: this.page, perpage: this.perpage, key: this.key})
      .subscribe((res) => {
        this.data = res;
        this.cdr.detectChanges();
      });
  }

  getTotal(): void {
    this.http.get(this.totalUrl, {key: this.key}).subscribe((res) => {
      this.total = res.hasOwnProperty('count') ? res.count : 0;
      this.cdr.detectChanges();
    });
  }

  add(): void {
    this.modal.createStatic(ConfAddComponent, {record: {show: false, title: '添加配置'}}, { size: 'md' }).subscribe(
      () => {
        this.msg.success('配置添加成功');
        this.st.reload();
      }
    );
  }

  reset(): void {
    setTimeout(() => {
      this.key = '';
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
