﻿modules.component('mainSideBar', {
    templateUrl: '/app-portal/pages/shared/components/main-side-bar/main-side-bar.html',
    controller: ['$scope', 'translator', function ($scope, translator) {
        var ctrl = this;
        ctrl.translator = null;
        ctrl.init = async function () {
            translator.init().then(function () {
                ctrl.translator = translator;
                ctrl.items = [
                    {
                        title: 'Dashboard',
                        shortTitle: 'Dashboard',
                        icon: 'mi mi-Tiles',
                        href: '/backend',
                        subMenus: []
                    },
                    {
                        title: translator.get('portal_articles'),
                        shortTitle: translator.get('portal_articles'),
                        icon: 'mi mi-Package',
                        href: '#',
                        subMenus: [
                            {
                                title: translator.get('portal_create'),
                                href: '/backend/article/create',
                                icon: 'mi mi-Add'
                            },
                            {
                                title: 'List',
                                href: '/backend/article/list',
                                icon: 'mi mi-List'
                            }
                        ]
                    },
                    {
                        title: translator.get('portal_products'),
                        shortTitle: translator.get('portal_products'),
                        icon: 'mi mi-Package',
                        href: '#',
                        subMenus: [
                            {
                                title: translator.get('portal_create'),
                                href: '/backend/product/create',
                                icon: 'mi mi-Add'
                            },
                            {
                                title: 'List',
                                href: '/backend/product/list',
                                icon: 'mi mi-List'
                            }
                        ]
                    },
                    {
                        title: translator.get('portal_pages'),
                        shortTitle: translator.get('portal_pages'),
                        icon: 'mi mi-Page',
                        href: '#',
                        subMenus: [
                            {
                                title: translator.get('portal_create'),
                                href: '/backend/page/create',
                                icon: 'mi mi-Add'
                            },
                            {
                                title: 'List',
                                href: '/backend/page/list',
                                icon: 'mi mi-List'
                            }
                        ]
                    },
                    {
                        title: 'Modules',
                        shortTitle: 'Modules',
                        icon: 'mi mi-ResolutionLegacy',
                        href: '#',
                        subMenus: [
                            {
                                title: translator.get('portal_create'),
                                href: '/backend/module/create',
                                icon: 'mi mi-Add'
                            },
                            {
                                title: 'List',
                                href: '/backend/module/list',
                                icon: 'mi mi-List'
                            }
                        ]
                    },
                    {
                        title: 'Themes',
                        shortTitle: 'Themes',
                        icon: 'mi mi-Personalize',
                        href: '#',
                        subMenus: [
                            {
                                title: translator.get('portal_create'),
                                href: '/backend/theme/create',
                                icon: 'mi mi-Add'
                            },
                            {
                                title: 'List',
                                href: '/backend/theme/list',
                                icon: 'mi mi-List'
                            }
                        ]
                    },
                    {
                        title: 'Media',
                        shortTitle: 'Media',
                        icon: 'mi mi-Photo2',
                        href: '#',
                        subMenus: [
                            {
                                title: translator.get('portal_create'),
                                href: '/backend/media/create',
                                icon: 'mi mi-Add'
                            },
                            {
                                title: 'List',
                                href: '/backend/media/list',
                                icon: 'mi mi-List'
                            }
                        ]
                    },
                    {
                        title: 'File',
                        shortTitle: 'File',
                        icon: 'mi mi-Photo2',
                        href: '#',
                        subMenus: [
                            {
                                title: translator.get('portal_create'),
                                href: '/backend/file/create',
                                icon: 'mi mi-Add'
                            },
                            {
                                title: 'List',
                                href: '/backend/file/list',
                                icon: 'mi mi-List'
                            }
                        ]
                    },
                    {
                        title: 'Users',
                        shortTitle: 'Users',
                        icon: 'mi mi-Contact',
                        href: '#',
                        subMenus: [
                            {
                                title: translator.get('portal_create'),
                                href: '/backend/user/create',
                                icon: 'mi mi-Add'
                            },
                            {
                                title: 'List',
                                href: '/backend/user/list',
                                icon: 'mi mi-List'
                            },
                            {
                                title: 'Roles',
                                href: '/backend/role/list',
                                icon: 'mi mi-List'
                            }
                        ]
                    },
                    {
                        title: 'Settings',
                        shortTitle: 'Settings',
                        icon: 'mi mi-Settings mi-spin',
                        href: '#',
                        subMenus: [
                            {
                                title: 'App Settings',
                                href: '/backend/app-settings/details',
                                icon: 'mi mi-Pen'
                            },
                            {
                                title: translator.get('portal_create'),
                                href: '/backend/configuration/create',
                                icon: 'mi mi-Add'
                            },
                            {
                                title: 'List',
                                href: '/backend/configuration/list',
                                icon: 'mi mi-List'
                            }
                        ]
                    },
                    {
                        title: 'Language',
                        shortTitle: 'Language',
                        icon: 'mi mi-Settings mi-spin',
                        href: '#',
                        subMenus: [
                            {
                                title: translator.get('portal_create'),
                                href: '/backend/language/create',
                                icon: 'mi mi-Add'
                            },
                            {
                                title: 'List',
                                href: '/backend/language/list',
                                icon: 'mi mi-List'
                            }
                        ]
                    },
                    {
                        title: 'Culture',
                        shortTitle: 'Culture',
                        icon: 'mi mi-Settings mi-spin',
                        href: '#',
                        subMenus: [
                            {
                                title: translator.get('portal_create'),
                                href: '/backend/culture/create',
                                icon: 'mi mi-Add'
                            },
                            {
                                title: 'List',
                                href: '/backend/culture/list',
                                icon: 'mi mi-List'
                            }
                        ]
                    }
                ]
                $scope.$apply();
            });
        };
        var culture = $('#lang').val();
        
    }],
    bindings: {
    }
});