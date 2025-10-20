import { MidiaApiResponse, ResultadoBuscaApiResponse } from '../models/midia-api-response';

export function mapearDadosPaginacao(res: ResultadoBuscaApiResponse | MidiaApiResponse) {
  const paginaAtual = res.page;
  const totalPaginas = res.total_pages;

  const { inicio, fim } = obterJanelaDePaginas(paginaAtual, totalPaginas, 7);
  const paginas = obterNumeroDePaginasEmArray(inicio, fim);

  return { paginaAtual, totalPaginas, paginas };
}

export function obterJanelaDePaginas(
  paginaAtual: number,
  totalPaginas: number,
  max: number
): { inicio: number; fim: number } {
  const tamanhoMaximo = Math.max(1, Math.min(max, totalPaginas));
  const raio = Math.floor(tamanhoMaximo / 2);

  let inicio = Math.max(1, paginaAtual - raio);

  const fim = Math.min(totalPaginas, inicio + tamanhoMaximo - 1);
  inicio = Math.max(1, fim - tamanhoMaximo + 1);

  return { inicio, fim };
}

export function obterNumeroDePaginasEmArray(a: number, b: number): number[] {
  return Array.from({ length: b - a + 1 }, (_, i) => a + i);
}
