export type ProjectCategory = "des-gothic" | "monster" | "visual-char";

export interface Project {
    id: string | number;
    title: string;
    category: ProjectCategory;
    src: string;
}

export const projects: Project[] = [
    // Des Gothic
    {
        id: "dg-1",
        title: "Gothic Frame",
        category: "des-gothic",
        src: "/assets/images/gothic_picture_frame.png",
    },
    {
        id: "dg-2",
        title: "Gothic Realm",
        category: "des-gothic",
        src: "/assets/images/gothic-background.jpg",
    },
    {
        id: "dg-3",
        title: "Dark Cathedral",
        category: "des-gothic",
        src: "/assets/images/gothic_background.jpg",
    },
    {
        id: "dg-4",
        title: "Ancient Relic",
        category: "des-gothic",
        src: "/assets/images/gothic_picture_frame.png",
    },

    // Monsters
    {
        id: "m-1",
        title: "Shadow Entity",
        category: "monster",
        src: "/assets/images/gothic_background.jpg",
    },
    {
        id: "m-2",
        title: "Night Stalker",
        category: "monster",
        src: "/assets/images/gothic-background.jpg",
    },
    {
        id: "m-3",
        title: "Blood Fiend",
        category: "monster",
        src: "/assets/images/gothic_picture_frame.png",
    },
    {
        id: "m-4",
        title: "Abyssal Beast",
        category: "monster",
        src: "/assets/images/gothic_background.jpg",
    },

    // Visuals & Character
    {
        id: "vc-1",
        title: "Character Design",
        category: "visual-char",
        src: "/assets/images/avt.png",
    },
    {
        id: "vc-2",
        title: "Visual Form",
        category: "visual-char",
        src: "/assets/images/my.jpeg",
    },
    {
        id: "vc-3",
        title: "Avatar Concept",
        category: "visual-char",
        src: "/assets/images/avt.jfif",
    },
    {
        id: "vc-4",
        title: "Portrait Study",
        category: "visual-char",
        src: "/assets/images/avt.png",
    },
];
