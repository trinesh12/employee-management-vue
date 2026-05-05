<template>
  <div class="card shadow-sm">
    <div class="card-header bg-primary text-white">
      <h2 class="h5 mb-0">{{ isEditing ? 'Edit Employee' : 'Add Employee' }}</h2>
    </div>

    <div class="card-body">
      <form @submit.prevent="submitForm">
        <div class="row g-3">
          <div class="col-md-6">
            <label for="employeeId" class="form-label">Employee ID</label>
            <input
              id="employeeId"
              v-model.trim="form.employeeId"
              type="text"
              class="form-control"
              placeholder="EMP001"
              required
            />
          </div>

          <div class="col-md-6">
            <label for="name" class="form-label">Name</label>
            <input
              id="name"
              v-model.trim="form.name"
              type="text"
              class="form-control"
              placeholder="Employee name"
              required
            />
          </div>

          <div class="col-md-6">
            <label for="designation" class="form-label">Designation</label>
            <input
              id="designation"
              v-model.trim="form.designation"
              type="text"
              class="form-control"
              placeholder="Software Developer"
              required
            />
          </div>

          <div class="col-md-6">
            <label for="department" class="form-label">Department</label>
            <select
              id="department"
              v-model="form.department"
              class="form-select"
              required
            >
              <option value="" disabled>Select department</option>
              <option>Engineering</option>
              <option>Human Resources</option>
              <option>Finance</option>
              <option>Sales</option>
              <option>Marketing</option>
              <option>Operations</option>
            </select>
          </div>

          <div class="col-md-6">
            <label for="salary" class="form-label">Salary</label>
            <input
              id="salary"
              v-model.number="form.salary"
              type="number"
              min="1"
              class="form-control"
              placeholder="45000"
              required
            />
          </div>
        </div>

        <div class="d-flex flex-wrap gap-2 mt-4">
          <button type="submit" class="btn btn-primary">
            {{ isEditing ? 'Update Employee' : 'Add Employee' }}
          </button>
          <button
            v-if="isEditing"
            type="button"
            class="btn btn-outline-secondary"
            @click="resetForm"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
const emptyForm = {
  employeeId: '',
  name: '',
  designation: '',
  department: '',
  salary: ''
}

export default {
  name: 'EmployeeForm',
  props: {
    selectedEmployee: {
      type: Object,
      default: null
    }
  },
  emits: ['save-employee', 'cancel-edit'],
  data() {
    return {
      form: { ...emptyForm }
    }
  },
  computed: {
    isEditing() {
      return Boolean(this.selectedEmployee)
    }
  },
  watch: {
    selectedEmployee: {
      immediate: true,
      handler(employee) {
        this.form = employee ? { ...employee } : { ...emptyForm }
      }
    }
  },
  methods: {
    submitForm() {
      this.$emit('save-employee', { ...this.form })

      if (!this.isEditing) {
        this.form = { ...emptyForm }
      }
    },
    resetForm() {
      this.form = { ...emptyForm }
      this.$emit('cancel-edit')
    }
  }
}
</script>
