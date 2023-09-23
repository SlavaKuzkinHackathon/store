export interface IDivanImagesItemProps {
    src: string,
    callback: (arg0: string) => void,
    alt: string
}

export interface IDivanAccordionProps {
    title: string
    children: React.ReactNode
}