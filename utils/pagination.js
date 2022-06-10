const baseURL = process.env.BASE_URL
  ? `${process.env.BASE_URL}`
  : 'http://localhost:3000'

const stringPage = '?page='

module.exports = {
  /**
   * Calculate pagination
   *
   * @param {number} page number of the page
   * @param {number} total entity count
   * @returns {Object} pagination object
   * */
  calculatePagination: (page, total, resource) => {
    const currentPage = parseInt(page, 10)
    const lastPage = Math.ceil(total / 10)
    const prevPage = currentPage === 1 || currentPage > lastPage + 1 ? undefined : currentPage - 1
    const nextPage = lastPage < currentPage + 1 ? undefined : currentPage + 1
    return {
      page: baseURL + resource + stringPage + currentPage,
      nextPage: nextPage ? baseURL + resource + stringPage + nextPage : undefined,
      prevPage: prevPage ? baseURL + resource + stringPage + prevPage : undefined,
      lastPage: baseURL + resource + stringPage + lastPage,
    }
  },
}
