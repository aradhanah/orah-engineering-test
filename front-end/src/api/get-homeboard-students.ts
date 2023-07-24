import { generateStudents } from "shared/helpers/data-generation"
import { httpMock } from "shared/helpers/http-mock"
import { addIfNotExist, LocalStorageKey } from "shared/helpers/local-storage"
import { ApiResponse } from "shared/interfaces/http.interface"
import { SearchSortParams } from "shared/interfaces/searchSort.interface"
import { Person } from "shared/models/person"

export async function getHomeboardStudents(params: SearchSortParams): Promise<ApiResponse<{ students: Person[] }>> {
  try {
    await httpMock({ randomFailure: true })
    return {
      success: true,
      students: generateStudents(15, params),
    }
  } catch (error) {
    return {
      success: false,
      error: {},
    }
  }
}
