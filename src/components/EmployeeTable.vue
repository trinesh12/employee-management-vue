<template>
  <div class="card shadow-sm">
    <div class="card-header bg-dark text-white">
      <h2 class="h5 mb-0">Employee List</h2>
    </div>

    <div class="card-body p-0">
      <div class="table-responsive">
        <table class="table table-striped table-hover align-middle mb-0">
          <thead class="table-light">
            <tr>
              <th>Employee ID</th>
              <th>Name</th>
              <th>Designation</th>
              <th>Department</th>
              <th>Salary</th>
              <th class="text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr v-if="employees.length === 0">
              <td colspan="6" class="text-center text-muted py-4">
                No employees found.
              </td>
            </tr>

            <tr v-for="employee in employees" :key="employee.id">
              <td>{{ employee.employeeId }}</td>
              <td>{{ employee.name }}</td>
              <td>{{ employee.designation }}</td>
              <td>{{ employee.department }}</td>
              <td>{{ formatSalary(employee.salary) }}</td>
              <td>
                <div class="d-flex justify-content-center gap-2">
                  <button
                    type="button"
                    class="btn btn-sm btn-warning"
                    @click="$emit('edit-employee', employee)"
                  >
                    Edit
                  </button>
                  <button
                    type="button"
                    class="btn btn-sm btn-danger"
                    @click="$emit('delete-employee', employee.id)"
                  >
                    Delete
                  </button>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'EmployeeTable',
  props: {
    employees: {
      type: Array,
      required: true
    }
  },
  emits: ['edit-employee', 'delete-employee'],
  methods: {
    formatSalary(salary) {
      return new Intl.NumberFormat('en-IN', {
        style: 'currency',
        currency: 'INR',
        maximumFractionDigits: 0
      }).format(Number(salary || 0))
    }
  }
}
</script>
