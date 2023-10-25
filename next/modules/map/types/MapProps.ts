export default interface MapProps {
  apiPath: string,
  mapping: (mkr: any) => React.ReactNode,
  setCsvData: React.Dispatch<React.SetStateAction<any[]>>,
}
