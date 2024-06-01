import { ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { STColumn, STComponent, STData } from '@delon/abc/st';
import { SFSchema } from '@delon/form';
import { ModalHelper, _HttpClient } from '@delon/theme';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NzModalService } from 'ng-zorro-antd/modal';

@Component({
  selector: 'app-worker-list',
  templateUrl: './list.component.html',
})
export class WorkerListComponent implements OnInit {
  url = `/worker/list`;
  data: { ipAddr: string; }[] = [];
  searchSchema: SFSchema = {
    properties: {
      ipAddr: {
        type: 'string',
        title: 'IP地址'
      }
    }
  };
  @ViewChild('st') private readonly st!: STComponent;
  columns: STColumn[] = [
    { title: 'IP地址', index: 'ipAddr' }
  ];

  constructor(private http: _HttpClient, private modal: ModalHelper, public msg: NzMessageService, private modalSrv: NzModalService, private cdr: ChangeDetectorRef) { }

  ngOnInit(): void {
    this.http
      .get(this.url)
      .subscribe((res) => {
        const workerArr = res.toString().split(',');
        for (let i = 0; i < workerArr.length; i++) {
          this.data[i] = {ipAddr: workerArr[i]};
        }
        this.st.reload();
        this.cdr.detectChanges();
      });
  }



}
