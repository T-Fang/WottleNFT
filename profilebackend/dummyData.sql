DO $$
    BEGIN
        for r in 1..1000 loop
        --password is '1'.
            insert into accounts(username, wallet_id, password, email) values(r, r, r, r);
        end loop;
    END;
$$;

DO $$
    BEGIN
        for r in 1..100 loop
            insert into listings(nft_id, seller_wallet_id, price, current_status) values(r, r, r, 'listing');
        end loop;
    END;
$$;

DO $$
    BEGIN
        for r in 1..100 loop
            insert into listings(nft_id, seller_wallet_id, price, current_status) values(r+100, r+100, r, 'cancelled');
        end loop;
    END;
$$;

DO $$
    BEGIN
        for r in 1..100 loop
            insert into listings(nft_id, seller_wallet_id, buyer_wallet_id, price, current_status) values(r+200, r+100, r+100,r, 'completed');
        end loop;
    END;
$$;