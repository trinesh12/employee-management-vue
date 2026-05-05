import axios from 'axios'
import { sampleEmployees } from '../data/sampleEmployees'

const API_URL = import.meta.env.VITE_API_BASE_URL
const STORAGE_KEY = 'employee-management-system-employees'

function loadLocalEmployees() {
  const savedEmployees = localStorage.getItem(STORAGE_KEY)

  if (savedEmployees) {
    return JSON.parse(savedEmployees)
  }

  localStorage.setItem(STORAGE_KEY, JSON.stringify(sampleEmployees))
  return sampleEmployees
}

function saveLocalEmployees(employees) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(employees))
}

function createLocalId() {
  return Date.now().toString()
}

export const usingMockApi = Boolean(API_URL)

export async function getEmployees() {
  if (API_URL) {
    const response = await axios.get(API_URL)
    return response.data
  }

  return loadLocalEmployees()
}

export async function addEmployee(employee) {
  if (API_URL) {
    const response = await axios.post(API_URL, employee)
    return response.data
  }

  const employees = loadLocalEmployees()
  const newEmployee = {
    ...employee,
    id: createLocalId()
  }

  saveLocalEmployees([...employees, newEmployee])
  return newEmployee
}

export async function updateEmployee(id, employee) {
  if (API_URL) {
    const response = await axios.put(`${API_URL}/${id}`, employee)
    return response.data
  }

  const employees = loadLocalEmployees()
  const updatedEmployees = employees.map((item) =>
    item.id === id ? { ...employee, id } : item
  )

  saveLocalEmployees(updatedEmployees)
  return { ...employee, id }
}

export async function deleteEmployee(id) {
  if (API_URL) {
    await axios.delete(`${API_URL}/${id}`)
    return
  }

  const employees = loadLocalEmployees()
  saveLocalEmployees(employees.filter((employee) => employee.id !== id))
}
