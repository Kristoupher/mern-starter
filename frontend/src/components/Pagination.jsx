import { Link } from 'react-router-dom';
import { ArrowLeftCircle, ArrowRightCircle } from "lucide-react";
//Module de pagination
const Pagination = ({ currentPage, totalPages, url }) => {
    //Initialisation des variables
    currentPage = parseInt(currentPage);
    totalPages = parseInt(totalPages);

    // Fonction qui permet de générer les numéros de page
    const renderPageNumbers = () => {
        const pageNumbers = [];
        const ellipsis = <span className="pagination-link">...</span>;

        if (totalPages <= 5) {
            for (let i = 1; i <= totalPages; i++) {
                pageNumbers.push(
                    <Link
                        key={i}
                        to={`${url}${i}`}
                        className={`${currentPage === i ? 'active' : ''} ${currentPage === i ? 'disabled' : ''}`}
                    >
                        {i}
                    </Link>
                );
            }
        } else {
            for (let i = 1; i <= 3; i++) {
                pageNumbers.push(
                    <Link
                        key={i}
                        to={`${url}${i}`}
                        className={`${currentPage === i ? 'active' : ''}`}
                    >
                        {i}
                    </Link>
                );
            }

            if (currentPage <= totalPages - 3) {
                pageNumbers.push(ellipsis);
            }

            for (let i = totalPages - 1; i <= totalPages; i++) {
                pageNumbers.push(
                    <Link
                        key={i}
                        to={`${url}${i}`}
                        className={`${currentPage === i ? 'active' : ''} ${currentPage === i ? 'disabled' : ''}`}
                    >
                        {i}
                    </Link>
                );
            }
        }

        return pageNumbers;
    };

    return (
        <div className={`pagination flex justify-center items-center mt-20 gap-x-8 ${totalPages > 1 ? '' : 'hidden'}`} >
            <Link
                to={`${url}${currentPage - 1}`}
                className={`${currentPage === 1 ? 'disabled pointer-events-none' : ''}`}
            >
                <ArrowLeftCircle size={40} color="#2E2E2E" strokeWidth={2} />
            </Link>
            <div className="pagination-numbers">
                {renderPageNumbers()}
            </div>
            <Link
                to={`${url}${currentPage + 1}`}
                className={`${currentPage === totalPages ? 'disabled pointer-events-none' : ''}`}
            >
                <ArrowRightCircle size={40} color="#2E2E2E" strokeWidth={2} />
            </Link>
        </div>
    );
};

export default Pagination;
