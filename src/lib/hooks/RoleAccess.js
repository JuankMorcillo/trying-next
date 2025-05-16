'use client'

import { useSession } from "next-auth/react";
import { usePathname } from 'next/navigation'
import roles from '../../app/api/auth/action_access.json';

export default function useRoleAccess() {
    const session = useSession();

    const page = usePathname();

    if (session.status === 'loading' || session.status === "unauthenticated") return {};

    const role = 'admin';

    const accessLevels = roles[role]?.[page];

    return {
        edit: accessLevels.edit,
        delete: accessLevels.remove,
        create: accessLevels.create,
        view: accessLevels.view,
        filter: accessLevels.filter,
    };
};
