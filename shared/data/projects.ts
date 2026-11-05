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
    // Des Gothic
    {
        id: "dg-1",
        title: "Gothic Frame",
        category: "des-gothic",
        src: "/assets/images/gothic_picture_frame.png",
        size: "large",
    },
    {
        id: "dg-2",
        title: "Gothic Realm",
        category: "des-gothic",
        src: "/assets/images/gothic-background.jpg",
        size: "small",
    },
    {
        id: "dg-3",
        title: "Dark Cathedral",
        category: "des-gothic",
        src: "/assets/images/gothic_background.jpg",
        size: "large",
    },
    {
        id: "dg-4",
        title: "Ancient Relic",
        category: "des-gothic",
        src: "/assets/images/gothic_picture_frame.png",
        size: "small",
    },

    // Monsters
    {
        id: "m-1",
        title: "Shadow Entity",
        category: "monster",
        src: "/assets/images/gothic_background.jpg",
        size: "small",
    },
    {
        id: "m-2",
        title: "Night Stalker",
        category: "monster",
        src: "/assets/images/gothic-background.jpg",
        size: "large",
    },
    {
        id: "m-3",
        title: "Blood Fiend",
        category: "monster",
        src: "/assets/images/gothic_picture_frame.png",
        size: "small",
    },
    {
        id: "m-4",
        title: "Abyssal Beast",
        category: "monster",
        src: "/assets/images/gothic_background.jpg",
        size: "large",
    },

    // Visuals & Character
    {
        id: "vc-1",
        title: "Character Design",
        category: "visual-char",
        src: "/assets/images/avt.png",
        size: "large",
    },
    {
        id: "vc-2",
        title: "Visual Form",
        category: "visual-char",
        src: "/assets/images/my.jpeg",
        size: "small",
    },
    {
        id: "vc-3",
        title: "Avatar Concept",
        category: "visual-char",
        src: "/assets/images/avt.jfif",
        size: "large",
    },
    {
        id: "vc-4",
        title: "Portrait Study",
        category: "visual-char",
        src: "/assets/images/avt.png",
        size: "small",
    },
];
