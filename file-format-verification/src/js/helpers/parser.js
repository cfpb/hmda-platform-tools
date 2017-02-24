import HmdaFileParser from 'hmda-file-parser'

const parser = new HmdaFileParser.parser.fi.CsvParser()

export const parseTs = ts => {
  const results = parser.parseTs(ts)
  if(results.errors) return results.errors
}

export const parseLar = lar => {
  const results = parser.parseLar(lar)
  if(results.errors) return results.errors
}
