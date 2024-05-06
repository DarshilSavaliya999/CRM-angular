import { Component } from '@angular/core';
import { APIService } from '../services/api.service';
import { AuthService } from '../services/auth.service';
import { FloatingDropdownService } from '../services/floating-dropdown.service';
import { FloatingModalService } from '../services/floating-modal.service';
import IBranch from '../model/Branch.model';
import { ActivatedRoute } from '@angular/router';
import IUser from '../model/User.model';
import { API } from 'src/assets/static/API';

@Component({
  selector: 'app-branch',
  templateUrl: './branch.component.html',
  styleUrls: ['./branch.component.css']
})
export class BranchComponent {

  pageTitle = 'Branches'
  branchList: IBranch[] = []
  filteredList: IBranch[] = []
  selectedUserList: IBranch[] = []
  filterText: string = ""
  user : IUser

  addLeadId = "add-lead"
  leadNameDropDownId = 'leadNameDropDownId'
  leadContactPersonDropDownId = 'leadContactPersonDropDownId'
  leadContactNumberDropDownId = 'leadContactNumberDropDownId'
  leadEmailDropDownId = 'leadEmailDropDownId'
  addOrgFloatingModalId = "addOrgFloatingModalId"

  constructor(
    private apiService: APIService,
    private authService: AuthService,
    private floatingDropdown: FloatingDropdownService,
    private floatingModal: FloatingModalService,
    private route : ActivatedRoute
  ) {
    this.user = this.route.snapshot.data['user'];
    this.getUsers()
  }


  openAddOrgForm(event: Event) {
    event.preventDefault()
    this.floatingModal.openFloatingModal(this.addOrgFloatingModalId)
    console.log(this.floatingModal.isFloatingModalOpen(this.addOrgFloatingModalId))
  }


  toggelUserSelect(event: Event, branch: IBranch) {
    var allChechbox = document.getElementById('AllOrgCheckbox') as HTMLInputElement
    var checkbox = event.target as HTMLInputElement
    if (checkbox.checked) {
      this.selectedUserList.push(branch)
    } else {
      this.selectedUserList = this.selectedUserList.filter((userInList) => userInList != branch)
    }
    if (this.selectedUserList.length == this.filteredList.length) {
      allChechbox.checked = true
      allChechbox.indeterminate = false
    } else if (this.selectedUserList.length != 0) {
      allChechbox.indeterminate = true
      allChechbox.checked = false
    } else {
      allChechbox.checked = false
      allChechbox.indeterminate = false
    }
    console.log(this.selectedUserList)
  }

  toggelAllUserSelection(event: Event) {
    var checkbox = event.target as HTMLInputElement
    if (checkbox.checked) {
      this.selectedUserList = this.filteredList
    }
    if (!checkbox.checked) {
      this.selectedUserList = []
    }
  }

  filterData(event: Event) {
    event.preventDefault();
    var regex = new RegExp(this.filterText, "i");
    this.filteredList = []
    this.branchList.forEach(branch => {
      if (regex.test(branch.branchName)) {
        this.filteredList.push(branch)
      } else if (regex.test(branch.branchCode)) {
        this.filteredList.push(branch)
      }
    });
  }

  openFloatingDropdown(event: Event, id: string) {
    event.preventDefault();
    this.floatingDropdown.toggeleFloatingDropdown(id)
  }

  async getUsers() {
    console.log(this.user)
    this.apiService.get(API.GET_BRANCHES + '/' + this.user.id, {
      headers: await this.authService.getAuthorizationHeader()
    }
    ).subscribe(
      (response) => {
        console.log(response)
        if (response.data) {
          console.log(response.data)
          this.branchList = response.data
          this.filteredList = this.branchList
        }
      },
      (error) => {
        console.log(error)
      }
    )
  }
}
