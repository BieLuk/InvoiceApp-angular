import {Component, OnInit, ViewChild} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {ClientApiService} from '../../shared/service/client/client-api.service';
import {ClientMapperService} from '../../shared/service/client/client-mapper.service';
import {map} from 'rxjs/operators';
import {ClientModel} from '../../shared/model/client/client.model';
import {NgForm} from '@angular/forms';
import {ToastrService} from 'ngx-toastr';

@Component({
  selector: 'app-client-edit',
  templateUrl: './client-edit.component.html',
  styleUrls: ['./client-edit.component.css']
})
export class ClientEditComponent implements OnInit {

  @ViewChild('clientForm')
  clientForm: NgForm;

  clientId: number;
  clientModel: ClientModel;

  constructor(private route: ActivatedRoute,
              private clientApiService: ClientApiService,
              private clientMapperService: ClientMapperService,
              private router: Router,
              private toastr: ToastrService) { }

  ngOnInit() {
    this.clientId = this.route.snapshot.queryParams['id'];

    this.loadClientDetails();
  }

  loadClientDetails() {
    this.clientApiService.getClientDetailsById(this.clientId).pipe(
      map(response => response.data),
      map(clientDto => this.clientMapperService.mapDtoToModel(clientDto))
    ).subscribe(client => this.clientModel = client);
  }

  updateClient() {
    this.clientApiService.updateClient(this.clientMapperService.mapModelToDto(this.clientModel))
      .subscribe(
        () => {
          this.router.navigate(['user/clients']);
          this.toastr.success('Klient został zaktualizowany', 'Sukces');
        },
        () => this.toastr.error('Wystąpił błąd przy zapisie klienta', 'Błąd')

      );
  }

  isSaveDisabled(): boolean {
    return this.clientForm.form.invalid;
  }

}
