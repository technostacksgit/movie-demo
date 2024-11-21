import { Pagination, PaginationContent, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from '@/components/ui/pagination'
import React from 'react'

type MovieListPaginationProps = {
    currentPage: number;
    totalPages: number;
    handlePageChange: (currentPage: number) => void
}

function MovieListPagination({currentPage, totalPages, handlePageChange}: MovieListPaginationProps) {
  return (
    <div className="py-10 lg:py-[120px]">
    <Pagination>
      <PaginationContent>
        {/* Previous Button */}
        <PaginationItem>
          <PaginationPrevious
            onClick={() =>
              currentPage > 1 && handlePageChange(currentPage - 1)
            }
          />
        </PaginationItem>

        {/* Pagination Links */}
        {Array.from({ length: totalPages }).map((_, index) => (
          <PaginationItem key={index}>
            <PaginationLink
              isActive={index + 1 === currentPage}
              onClick={() => handlePageChange(index + 1)}
            >
              {index + 1}
            </PaginationLink>
          </PaginationItem>
        ))}

        {/* Next Button */}
        <PaginationItem>
          <PaginationNext
            onClick={() =>
              currentPage < totalPages &&
              handlePageChange(currentPage + 1)
            }
          />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  </div>
  )
}

export default MovieListPagination