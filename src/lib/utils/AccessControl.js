import roleAccessMap from '../../app/api/auth/role_route_map.json';

export default function DoesRoleHaveAccessToURL(role, url) {
    const accessibleRoutes = roleAccessMap[role] || [];
    return accessibleRoutes.some(route => {
        // Create a regex from the route by replacing dynamic segments
        const regexPattern = route.replace(/\[.*?\]/g, "[^/]+").replace("/", "\\/");
        const regex = new RegExp(`^${regexPattern}$`);

        return regex.test(url);
    });
}