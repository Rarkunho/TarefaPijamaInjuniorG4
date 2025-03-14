import setaEsq from "../../assets/botaoesq.png"
import setaDir from "../../assets/botaodir.png"
import styles from "./styles.module.css"


interface PaginationProps {
    totalPages: number
    currentPage: number
    onPageChange: (page: number) => void
}


export default function Pagination({totalPages, currentPage, onPageChange,}: PaginationProps) {
    const generatePages = () => {
      const pages = [];
      const maxVisiblePages = 5
  
      if (totalPages <= maxVisiblePages) {
        for (let i = 1; i <= totalPages; i++) {
          pages.push(i);
        }
      } else {
        pages.push(1);
        if (currentPage > 3) {
          pages.push("...");
        }
        const startPage = Math.max(2, currentPage - 1);
        const endPage = Math.min(totalPages - 1, currentPage + 1);
  
        for (let i = startPage; i <= endPage; i++) {
          pages.push(i);
        }
  
        if (currentPage < totalPages - 2) {
          pages.push("...");
        }
        pages.push(totalPages);
      }
  
      return pages;
    };
  
    return (
      <div className={styles.container}>
        <button
          className={styles.seta}
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage === 1}
        >
          <img src={setaEsq} alt="Botão de voltar pagina"/>
        </button>
  
        {generatePages().map((page, index) =>
          typeof page === "number" ? (
            <button
              key={index}
              className={`${styles.page} ${currentPage === page ? styles.pageAtual : ""}`}
              onClick={() => onPageChange(page)}
            >
              {page}
            </button>
          ) : (
            <span key={index} className={styles.entrePages}>
              {page}
            </span>
          )
        )}
  
        <button
          className={styles.seta}
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
        >
          <img src={setaDir} alt="Botão de avançar pagina"/>
        </button>
      </div>
    )
  }