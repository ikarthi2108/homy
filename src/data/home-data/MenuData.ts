const menu_data = [
    {
        id: 1,
        has_dropdown: true,
        title: "Home",
        link: "/",
        sub_menus: [
            { link: "/", title: "Explore Home" },
        ],
    },
    {
        id: 2,
        has_dropdown: true,
        title: "Listings",
        link: "/listing_01",
        sub_menus: [
            { link: "/listing_01", title: "See Properties" },
        ],
    },
    {
        id: 3,
        has_dropdown: false,
        title: "About",
        link: "/about_us_01",
    },
    {
        id: 4,
        has_dropdown: true,
        title: "Blog",
        link: "/blog_01",
        sub_menus: [
            { link: "/blog_01", title: "Our Blog" },
        ],
    },
];

export default menu_data;
