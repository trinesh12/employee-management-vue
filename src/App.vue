<template>
  <main class="app-shell">
    <section class="bg-primary text-white py-4">
      <div class="container">
        <div class="d-flex flex-column flex-md-row justify-content-between gap-2">
          <div>
            <h1 class="h2 mb-1">Employee Management System</h1>
            <p class="mb-0 opacity-75">
              Vue.js, Axios, MockAPI-ready REST calls, and Bootstrap
            </p>
          </div>
          <span class="badge text-bg-light align-self-md-center">
            {{ apiLabel }}
          </span>
        </div>
      </div>
    </section>

    <div class="container py-4">
      <div
        v-if="message.text"
        class="alert mt-1"
        :class="message.type === 'success' ? 'alert-success' : 'alert-danger'"
        role="alert"
      >
        {{ message.text }}
      </div>

      <div class="row g-4 mt-1">
        <div class="col-lg-4">
          <EmployeeForm
            :selected-employee="selectedEmployee"
            @save-employee="saveEmployee"
            @cancel-edit="cancelEdit"
          />
        </div>

        <div class="col-lg-8">
          <div v-if="loading" class="text-center py-5">
            <div class="spinner-border text-primary" role="status">
              <span class="visually-hidden">Loading...</span>
            </div>
            <p class="text-muted mt-3 mb-0">Loading employees...</p>
          </div>

          <EmployeeTable
            v-else
            :employees="employees"
            @edit-employee="editEmployee"
            @delete-employee="removeEmployee"
          />
        </div>
      </div>
    </div>
  </main>
</template>

<script>
import EmployeeForm from './components/EmployeeForm.vue'
import EmployeeTable from './components/EmployeeTable.vue'
import {
  addEmployee,
  deleteEmployee,
  getEmployees,
  updateEmployee,
  usingMockApi
} from './services/employeeService'

export default {
  name: 'App',
  components: {
    EmployeeForm,
    EmployeeTable
  },
  data() {
    return {
      employees: [],
      selectedEmployee: null,
      loading: false,
      message: {
        text: '',
        type: 'success'
      }
    }
  },
  computed: {
    apiLabel() {
      return usingMockApi ? 'MockAPI Connected' : 'Sample Data Mode'
    }
  },
  mounted() {
    this.fetchEmployees()
  },
  methods: {
    async fetchEmployees() {
      this.loading = true

      try {
        this.employees = await getEmployees()
      } catch (error) {
        this.showMessage('Unable to load employees. Please check the API URL.', 'error')
      } finally {
        this.loading = false
      }
    },
    async saveEmployee(employee) {
      try {
        if (this.selectedEmployee) {
          const updatedEmployee = await updateEmployee(this.selectedEmployee.id, employee)
          this.employees = this.employees.map((item) =>
            item.id === updatedEmployee.id ? updatedEmployee : item
          )
          this.showMessage('Employee updated successfully.', 'success')
        } else {
          const newEmployee = await addEmployee(employee)
          this.employees = [...this.employees, newEmployee]
          this.showMessage('Employee added successfully.', 'success')
        }

        this.selectedEmployee = null
      } catch (error) {
        this.showMessage('Unable to save employee. Please try again.', 'error')
      }
    },
    editEmployee(employee) {
      this.selectedEmployee = { ...employee }
      window.scrollTo({ top: 0, behavior: 'smooth' })
    },
    async removeEmployee(id) {
      const confirmed = confirm('Are you sure you want to delete this employee?')

      if (!confirmed) {
        return
      }

      try {
        await deleteEmployee(id)
        this.employees = this.employees.filter((employee) => employee.id !== id)
        this.showMessage('Employee deleted successfully.', 'success')
      } catch (error) {
        this.showMessage('Unable to delete employee. Please try again.', 'error')
      }
    },
    cancelEdit() {
      this.selectedEmployee = null
    },
    showMessage(text, type) {
      this.message = { text, type }

      setTimeout(() => {
        this.message.text = ''
      }, 3000)
    }
  }
}
</script>
