import { useNavigate } from 'react-router-dom';
import { css } from 'styled-system/css';
import { vstack, center, hstack } from 'styled-system/patterns';
import { useStudioReaderContext } from '@/hooks/use-studio-reader-context';
import { formatTimeHandler } from '@/handlers/format-time.handler';
import type { ReadingMetrics } from '@/interfaces/ui.interface';

interface BookReaderSummaryProps {
  bookTitle: string;
  metrics: ReadingMetrics;
}

export const BookReaderSummary = ({
  bookTitle,
  metrics,
}: BookReaderSummaryProps) => {
  const navigate = useNavigate();
  const { resetReader } = useStudioReaderContext();

  const handleClose = () => {
    resetReader();
    navigate('/studio');
  };

  const totalPages = Object.keys(metrics.perPage).length;

  return (
    <main
      className={css({
        width: '100%',
        backgroundColor: 'white',
        fontFamily: 'body',
        color: 'gray.800',
        flex: 1,
        overflow: 'auto',
        padding: '8',
      })}
    >
      <div
        className={center({
          width: '100%',
          height: '100%',
          minHeight: '400px',
        })}
      >
        <div
          className={vstack({
            width: '100%',
            maxWidth: '2xl',
            gap: '8',
            alignItems: 'center',
            textAlign: 'center',
          })}
        >
          <div className={vstack({ gap: '4', alignItems: 'center' })}>
            <div className={css({ fontSize: '4xl', marginBottom: '2' })}>
              🎉
            </div>
            <h1
              className={css({
                fontSize: '3xl',
                fontWeight: 'bold',
                color: 'gray.900',
              })}
            >
              ¡Lectura Completada!
            </h1>
            <h2
              className={css({
                fontSize: 'xl',
                color: 'gray.600',
                fontWeight: 'medium',
              })}
            >
              {bookTitle}
            </h2>
          </div>

          <div
            className={css({
              backgroundColor: 'blue.50',
              borderRadius: 'lg',
              padding: '6',
              width: '100%',
              borderWidth: '1px',
              borderColor: 'blue.200',
            })}
          >
            <div className={vstack({ gap: '4', alignItems: 'center' })}>
              <h3
                className={css({
                  fontSize: 'lg',
                  fontWeight: 'semibold',
                  color: 'blue.900',
                })}
              >
                Resumen de Lectura
              </h3>
              <div
                className={hstack({
                  gap: '8',
                  justifyContent: 'center',
                  flexWrap: 'wrap',
                })}
              >
                <div
                  className={vstack({
                    gap: '1',
                    alignItems: 'center',
                  })}
                >
                  <div
                    className={css({
                      fontSize: '2xl',
                      fontWeight: 'bold',
                      color: 'blue.700',
                    })}
                  >
                    {formatTimeHandler(metrics.total)}
                  </div>
                  <div
                    className={css({
                      fontSize: 'sm',
                      color: 'blue.600',
                    })}
                  >
                    Tiempo Total
                  </div>
                </div>
                <div
                  className={vstack({
                    gap: '1',
                    alignItems: 'center',
                  })}
                >
                  <div
                    className={css({
                      fontSize: '2xl',
                      fontWeight: 'bold',
                      color: 'blue.700',
                    })}
                  >
                    {totalPages}
                  </div>
                  <div
                    className={css({
                      fontSize: 'sm',
                      color: 'blue.600',
                    })}
                  >
                    Páginas Leídas
                  </div>
                </div>
                <div
                  className={vstack({
                    gap: '1',
                    alignItems: 'center',
                  })}
                >
                  <div
                    className={css({
                      fontSize: '2xl',
                      fontWeight: 'bold',
                      color: 'blue.700',
                    })}
                  >
                    {totalPages > 0
                      ? formatTimeHandler(
                          Math.round(metrics.total / totalPages)
                        )
                      : '0s'}
                  </div>
                  <div
                    className={css({
                      fontSize: 'sm',
                      color: 'blue.600',
                    })}
                  >
                    Promedio por Página
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div
            className={css({
              backgroundColor: 'gray.50',
              borderRadius: 'lg',
              padding: '6',
              width: '100%',
              borderWidth: '1px',
              borderColor: 'gray.200',
            })}
          >
            <h3
              className={css({
                fontSize: 'lg',
                fontWeight: 'semibold',
                color: 'gray.900',
                marginBottom: '4',
                textAlign: 'center',
              })}
            >
              Tiempo por Página
            </h3>
            <div
              className={css({
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(120px, 1fr))',
                gap: '3',
              })}
            >
              {Object.entries(metrics.perPage)
                .sort(([a], [b]) => parseInt(a) - parseInt(b))
                .map(([pageIndex, seconds]) => (
                  <div
                    key={pageIndex}
                    className={css({
                      backgroundColor: 'white',
                      borderRadius: 'md',
                      padding: '3',
                      textAlign: 'center',
                      borderWidth: '1px',
                      borderColor: 'gray.200',
                    })}
                  >
                    <div
                      className={css({
                        fontSize: 'xs',
                        color: 'gray.500',
                        fontWeight: 'medium',
                      })}
                    >
                      Página {parseInt(pageIndex) + 1}
                    </div>
                    <div
                      className={css({
                        fontSize: 'sm',
                        fontWeight: 'semibold',
                        color: 'gray.700',
                        marginTop: '1',
                      })}
                    >
                      {formatTimeHandler(seconds)}
                    </div>
                  </div>
                ))}
            </div>
          </div>

          <button
            onClick={handleClose}
            className={css({
              backgroundColor: 'blue.600',
              color: 'white',
              fontSize: 'lg',
              fontWeight: 'semibold',
              borderRadius: 'lg',
              padding: '2',
              border: 'none',
              cursor: 'pointer',
              marginTop: '4',
              _hover: {
                backgroundColor: 'blue.700',
              },
              _active: {
                backgroundColor: 'blue.800',
              },
            })}
          >
            Volver a la Biblioteca
          </button>
        </div>
      </div>
    </main>
  );
};
