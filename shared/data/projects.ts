export type ProjectCategory = "des-gothic" | "monster" | "visual-char";
export type ProjectSize = "small" | "medium" | "large";

export interface Project {
    id: string | number;
    title: string;
    category: ProjectCategory;
    src: string;
    size?: ProjectSize;
}

export const projects: Project[] = [
    // Des Gothic - Chapter I (10 items)
    {
        id: "dg-1",
        title: "Fusehime Soryu",
        category: "des-gothic",
        src: "/assets/projects/des-gothic/dg1.png",
        size: "large",
    },
    {
        id: "dg-3",
        title: "Cursed Chalice",
        category: "des-gothic",
        src: "/assets/projects/des-gothic/dg3.png",
        size: "medium",
    },
    {
        id: "dg-4",
        title: "Angeletta",
        category: "des-gothic",
        src: "/assets/projects/des-gothic/dg4.png",
        size: "large",
    },
    {
        id: "dg-5",
        title: "Yoruki Matsunoa",
        category: "des-gothic",
        src: "/assets/projects/des-gothic/dg5.png",
        size: "small",
    },
    {
        id: "dg-6",
        title: "Irae",
        category: "des-gothic",
        src: "/assets/projects/des-gothic/dg6.png",
        size: "large",
    },
    {
        id: "dg-8",
        title: "Darcelle L.Nocturne",
        category: "des-gothic",
        src: "/assets/projects/des-gothic/dg8.png",
        size: "medium",
    },
    {
        id: "dg-10",
        title: "Pearlie",
        category: "des-gothic",
        src: "/assets/projects/des-gothic/dg10.jpg",
        size: "medium",
    },
    {
        id: "dg-11",
        title: "Jean Baptiste",
        category: "des-gothic",
        src: "/assets/projects/des-gothic/dg11.jpg",
        size: "small",
    },
    {
        id: "dg-12",
        title: "Akuma",
        category: "des-gothic",
        src: "/assets/projects/des-gothic/dg12.jpg",
        size: "large",
    },
    {
        id: "dg-13",
        title: "Lysandra Onyx Nocté",
        category: "des-gothic",
        src: "/assets/projects/des-gothic/dg13.jpg",
        size: "medium",
    },

    // Monsters - Chapter II (Curated 6 items for smooth scroll)
    {
        id: "m-1",
        title: "Asaktra",
        category: "monster",
        src: "/assets/projects/monsters/asaktra.png",
        size: "large",
    },
    {
        id: "m-5",
        title: "Chimera",
        category: "monster",
        src: "/assets/projects/monsters/chimera.jpg",
        size: "medium",
    },
    {
        id: "m-6",
        title: "Coeden",
        category: "monster",
        src: "/assets/projects/monsters/coeden.png",
        size: "large",
    },
    {
        id: "m-10",
        title: "Qixiao",
        category: "monster",
        src: "/assets/projects/monsters/qixiao.png",
        size: "small",
    },
    {
        id: "m-11",
        title: "Tekina",
        category: "monster",
        src: "/assets/projects/monsters/tekina.png",
        size: "large",
    },
    {
        id: "m-13",
        title: "Zueh",
        category: "monster",
        src: "/assets/projects/monsters/zueh.png",
        size: "medium",
    },

    // Visuals & Character - Chapter III (4 items)
    {
        id: "vc-1",
        title: "Kantel Board",
        category: "visual-char",
        src: "/assets/projects/visuals/kantel-board.png",
        size: "large",
    },
    {
        id: "vc-2",
        title: "Avatar Concept",
        category: "visual-char",
        src: "/assets/images/avt.png",
        size: "medium",
    },
    {
        id: "vc-3",
        title: "Visual Form",
        category: "visual-char",
        src: "/assets/images/my.jpeg",
        size: "large",
    },
    {
        id: "vc-4",
        title: "Portrait Study",
        category: "visual-char",
        src: "/assets/images/avt.jfif",
        size: "medium",
    },
];
